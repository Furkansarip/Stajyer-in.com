const Job = require('../models/Job');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createJob = async (req, res) => {
  const job = await Job.create({
    companyName:req.body.companyName,
    jobTitle:req.body.jobTitle,
    location:req.body.location,
    description:req.body.description,
    category:req.body.category,
    user:req.session.userID
  });
  try {
    console.log(req.body)
    res.status(201).redirect('/jobs');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  
  const categorySlug = req.query.categories
  const category=await Category.findOne({slug:categorySlug})

  let filter={}

  if(categorySlug){
    filter={category:category._id}
  }
  
  const jobs = await Job.find(filter);
  const categories = await Category.find();
  try {
    res.status(200).render('jobs', {
      page_name: 'jobs',
      jobs,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getJob = async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug }).populate('user');
  const user=await User.findById(req.session.userID)
  try {
    res.status(200).render('job', {
      page_name: 'jobs',
      job,
      user
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollJob = async (req, res) => {
  const user = await User.findById(req.session.userID)
  await user.jobs.push(req.body.job_id)
  await user.save()
  const intern=await Job.findOne({ _id:req.body.job_id })
  await intern.students.push(req.session.userID)
  await intern.save()
  try {
    res.status(200).redirect('/users/dashboard')
     
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseJob = async (req, res) => {
  const user = await User.findById(req.session.userID)
  await user.jobs.pull(req.body.job_id)
  await user.save()
  const internr=await Job.findOne({ _id:req.body.job_id })
  await internr.students.pull(req.session.userID)
  await internr.save()
  try {
    res.status(200).redirect('/users/dashboard')
     
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
