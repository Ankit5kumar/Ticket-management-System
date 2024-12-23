const { default: mongoose } = require("mongoose");
const Team = require("../models/Team");
const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};
const ProfileById = async (req, res) => {
  const managerid = req.user.id;

  try {
    const { _id } = req.params;

    const userId = new mongoose.Types.ObjectId(`${_id}`);
    
    const managerTeam = await Team.findOne({ manager: managerid });

    if (!managerTeam) return res.status(404).json({ msg: "Team not found" });

    if (!managerTeam.members.includes(userId)) {
      return res.status(403).json({ msg: "This member is not in your team" });
    }
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};
const AllUser = async (req, res) => {
  try {
    const Alluser = await User.find().select("-password");

    if (!Alluser) return res.status(404).json({ message: "Users not found" });

    return res
      .status(200)
      .json({ msg: "All users", "Total user": Alluser.length, Alluser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

module.exports = {
  getProfile,
  AllUser,
  ProfileById,
};
