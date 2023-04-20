// getting mongoose library for creating schema and model
const mongoose = require('mongoose');

/**
 * by using new mongoose.Schema funciton we create a schema for user
 * user schema has 3 fields name, email (unique), password and a timestamps which will keep created and update time of user
 */
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

//creating model out of user schema and exporting it
const User = mongoose.model('user', userSchema);
module.exports = User;