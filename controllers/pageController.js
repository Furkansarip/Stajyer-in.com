const User = require('../models/User');
exports.getIndexPage=async(req,res)=>{
    const user=await User.findOne({_id:req.session.userID})
    const activeUser=await User.findOne({_id:req.session.userID})
    console.log(req.session.userID)
    res.status(200).render('index',{
        page_name:"index",
        user,
        activeUser
    })
}

exports.getAboutPage=async(req,res)=>{
    const user=await User.findOne({_id:req.session.userID})
    const activeUser=await User.findOne({_id:req.session.userID})
    res.status(200).render('about',{
        page_name:"about",
        user,
        activeUser
    })
}

exports.getRegisterPage=(req,res)=>{
    
    res.status(200).render('register',{
        page_name:"register"
    })
}

exports.getLoginPage=(req,res)=>{
    res.status(200).render('login',{
        page_name:"login"
    })
}