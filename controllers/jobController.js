const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  const job = await Job.create(req.body);
  try {
    res.status(201).redirect('/')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllJobs = async (req, res) => {
    const jobs = await Job.find()
    try {
      res.status(200).render('jobs',{
          page_name:"jobs",
          jobs,
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

exports.getCourse = async (req, res) => {
    const job = await Job.findOne({slug:req.params.slug})
    try {
      res.status(200).render('job',{
          page_name:"jobs",
          job,
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
