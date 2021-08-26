const express = require('express');
const jobController=require('../controllers/jobController')
const roleMiddleware=require('../middlewares/roleMiddleware')

const router=express.Router();

router.route('/').post(roleMiddleware(["Company"]),jobController.createJob)//localhost:3000/jobs
router.route('/').get(jobController.getAllJobs)//localhost:3000/jobs 
router.route('/:slug').get(jobController.getJob)//localhost:3000/jobs/slug
router.route('/enroll').post(jobController.enrollJob)//localhost:3000/jobs/slug
router.route('/release').post(jobController.releaseJob)//localhost:3000/jobs/slug


module.exports=router