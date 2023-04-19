const mongoose = require('mongoose');

console.log("model --> user");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;