const User = require('../models/User');
const Profile = require('../models/Profile');
const fileUpload = require('express-fileupload')
const fs = require('fs');

exports.createProfile = async (req, res) => {  
  try {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Profile.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
}catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  }
  

  exports.getProfile=async(req,res)=>{
    const user = await User.findOne({ slug: req.params.slug })
    
    res.status(200).render('profiles',{
        page_name:"profiles",
        user
        
    })
  }