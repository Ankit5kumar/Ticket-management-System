const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const invalidateToken = require('../models/Blacklisttoken')

const register = async (req, res) => {
  const { username, email, password  } = req.body;

  // Check for missing fields
  const missingField = !username
    ? "username"
    : !email
    ? "email"
    : !password
    ? "password"
    : null;
  if (missingField) {
    return res.status(400).json({ msg: `${missingField} not provided` });
  }

  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    return res
      .status(400)
      .json({ error: "A user already exists with this email" });
  }

  const existingUserByUsername = await User.findOne({ username });
  if (existingUserByUsername) {
    return res.status(400).json({ error: "Username is already taken" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,

    roles: ["User"],
  });
  
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
    },
  });
};

const login = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) return res.status(404).json({ msg: "user not found" });
    const Ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!Ispasswordvalid)
      return res.status(401).json({ msg: "invalid credentials" });
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      {expiresIn:'2h'}
    );
    // res.setHeader("Authorization", `Bearer ${token}`);
    
    return res
      .status(200)
      .json({ msg: "login Successfully", user, access_token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

const logout = async (req,res)=>{
  const token = req.headers['authorization']?.split(' ')[1];     
  if(token){
     const expiresAt = new Date(Date.now() + 3600000); 
     await invalidateToken.create({
      token,
      expiresAt
     })
  }
  return res.status(201).json({msg:"Logged out successfully"})
}

module.exports = {
  login,
  register,
  logout,
};

 
  