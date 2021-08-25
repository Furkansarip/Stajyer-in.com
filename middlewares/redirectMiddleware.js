

module.exports=(req,res,next)=>{//Kullanıcı var ise login ve registera ulaşamasın.
    if(req.session.userID){
        return res.redirect('/')
    }
    next();
}