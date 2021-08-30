const express = require('express');
const authController=require('../controllers/authController')
const authMiddleware=require('../middlewares/authMiddleware')

const router=express.Router();

router.route('/signup').post(authController.createUser)//localhost:3000/
router.route('/list').post(authController.getListPage)//localhost:3000/

router.route('/login').post(authController.loginUser)//localhost:3000/
router.route('/logout').get(authController.logoutUser)//localhost:3000/
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage)
router.route('/:slug').get(authController.getProfile)
router.route('/dashboard').post(authController.updateProfile)
router.route('/:slug').post(authController.updateProfile)
//localhost:3000///localhost:3000/users/dashboard öncesinde middleware bak sonra controllera geç




module.exports=router