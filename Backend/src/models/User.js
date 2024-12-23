const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,
    },
    name:{type:String},
    Mobile:{type:String},
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },

   roles: [{ type: String, enum: ['User', 'Manager', 'Admin'], default: 'User' }],
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
