const Job = require('../models/Job');
const Category = require('../models/Category');

exports.createJob = async (req, res) => {
  const job = await Job.create(req.body);
  try {
    res.status(201).redirect('/');
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

exports.getCourse = async (req, res) => {
  const job = await Job.findOne({ slug: req.params.slug });
  try {
    res.status(200).render('job', {
      page_name: 'jobs',
      job,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
