const mongoose = require('mongoose');
const fs=require('fs')
const User = require('../models/User')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
 
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});




const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
