const mongoose = require('mongoose');

const invalidateToken = mongoose.Schema({
    token:{
        type:String,
        require:true
        
    },
    expiresAt:{type:Date , required:true}
})

module.exports = mongoose.model("invalidateToken",invalidateToken);
