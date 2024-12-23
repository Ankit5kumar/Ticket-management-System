const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
            return res.status(403).json({ message: ' Forbidden' });
        }
        const hasRole = req.user.roles.some(role => roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: ' Forbidden' });
        }
        next();
    };
};
module.exports = { authorizeRoles };
      
        
        
        


   

      