const express = require('express');
const jobController=require('../controllers/jobController')
const roleMiddleware=require('../middlewares/roleMiddleware')

const router=express.Router();

router.route('/').post(roleMiddleware(["company"]),jobController.createJob)//localhost:3000/jobs
router.route('/').get(jobController.getAllJobs)//localhost:3000/jobs 
router.route('/:slug').get(jobController.getCourse)//localhost:3000/jobs/slug


module.exports=router