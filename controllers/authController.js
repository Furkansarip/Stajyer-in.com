const User = require('../models/User')
const bcrypt = require('bcrypt'); //Password hash için gerekli paket
exports.createUser = async (req, res) => {
    const user = await User.create(req.body);
    try {
      res.status(201).json({
          status:"success",
          user
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };

  exports.loginUser = async (req, res) => {
    
    try {
      const {email,password}=req.body
      await User.findOne({email:email},(error,user)=>{
        if(user){
          bcrypt.compare(password,user.password,(error,same)=>{
            if(same){
              res.status(200).redirect('/')
            }
          })
        }
      })
     
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };