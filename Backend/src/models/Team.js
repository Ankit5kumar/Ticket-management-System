const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,
    manager:{type:mongoose.Schema.Types.ObjectId , required:true}
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);