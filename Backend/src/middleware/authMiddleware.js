const jwt = require('jsonwebtoken');
const blacklisttoken = require('../models/Blacklisttoken')
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        
        req.user = decoded; 
        next();
    });
};

const checkBlacllist  = async (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];  

    if(token){
      const blacklisted = await blacklisttoken.findOne({token})
      if(blacklisted){
        return res.status(401).json({msg:"invalidate token"})
      }
    }
    next();
}
module.exports = {verifyToken,checkBlacllist };