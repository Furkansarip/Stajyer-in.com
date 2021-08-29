const express = require('express');
const profileController=require('../controllers/profileController')

const router=express.Router();

router.route('/').post(profileController.createProfile)



module.exports=router