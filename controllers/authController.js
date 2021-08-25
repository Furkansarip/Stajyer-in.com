const User = require('../models/User');
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
  const user=await User.findOne({_id:req.session.userID})
  res.status(200).render('dashboard',{
      page_name:"dashboard",
      user
  })
}