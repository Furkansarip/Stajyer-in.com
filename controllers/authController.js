const User = require('../models/User');
const fs = require('fs');
const Profile = require('../models/Profile');
const Job = require('../models/Job');
const Category = require('../models/Category');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt'); //Password hash için gerekli paket
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  try {
    res.status(201).redirect('/login')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email }, (error, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            req.session.userID = user._id; //Giriş yapan kullanıcı idsini sessiona atadık
            res.status(200).redirect('/users/dashboard');
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage=async(req,res)=>{
  const user=await User.findOne({_id:req.session.userID}).populate('jobs')
  const categories=await Category.find()
  const jobs=await Job.find({user:req.session.userID})
  const sjobs=await Job.findOne({user:req.session.userID}).populate('students')
  const activeUser=await User.findOne({_id:req.session.userID})
  
  res.status(200).render('dashboard',{
      page_name:"dashboard",
      user,
      categories,
      jobs,
      sjobs,
      activeUser
  })
}

exports.getListPage=async(req,res)=>{
  const user=await User.findOne({_id:req.session.userID}).populate('jobs')
  const categories=await Category.find()
  const jobs=await Job.find({user:req.session.userID})
  const sjobs=await Job.findOne({_id:req.body.jobList}).populate('students')
  console.log(sjobs._id)
  
  res.status(200).render('list',{
      page_name:"list",
      user,
      categories,
      jobs,
      sjobs
  })
}

exports.getProfile=async(req,res)=>{
  const user = await User.findOne({ slug: req.params.slug })
  const activeUser=await User.findOne({_id:req.session.userID})/*
  slugdaki user bilgileriyle sesssion user çakışmasını engellemek için aktif kullanıcıyı buldum.
  ve navbarda ve profile sayfasında çağırdım. 
  */
  console.log(user.role)
  console.log(activeUser.role)

 // const profile=await Profile.findOne({user:})
 console.log(req.session.userID)
  
  res.status(200).render('profiles',{
      page_name:"profiles",
      user,
      activeUser
      
  })
}


exports.updateProfile = async (req, res) => {
  try {    
    if (!req.files || Object.keys(req.files).length === 0) {
    const user= await User.findOne({_id:req.session.userID});
    user.firstName = req.body.firstName;
    user.LastName = req.body.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.adress = req.body.adress;
    user.education = req.body.education;
    user.coverLetter = req.body.coverLetter;
    user.save();  
    res.status(200).redirect('/');
     
    }
    let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath)
  
  console.log(uploadeImage.name)
  const user= await User.findOne({_id:req.session.userID});
  
    
    user.firstName = req.body.firstName;
    user.LastName = req.body.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.adress = req.body.adress;
    user.education = req.body.education;
    user.coverLetter = req.body.coverLetter;
    user.image='/uploads/'+uploadeImage.name;
    user.save();    
    console.log(req.body.firstName)
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'failXXX',
      error,
    });
  }
};