const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcrypt'); //Password hash için gerekli paket
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName:{
    type:String,
    default:"First Name"
  },
  LastName:{
    type:String,
    default:"Last Name"
  },
  phoneNumber:{
    type:String,
    default:"Phone Number"
  },
  image:{
    type:String
  },
  adress:{
    type:String,
    default:"Adress"
  },
  education:{
    type:String,
    default:"Education"
  },
  cvFile:{
    type:String
  },
  coverLetter:{
    type:String
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:['Company','Intern'],
    default:'intern'
  },
  jobs:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Job'
  },  
  ],
  slug:{
    type:String,
    unique:true
},
   
});
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

UserSchema.pre('validate',function(next){
  this.slug=slugify(this.username,{
      lower:true,
      strict:true
  })
  
  next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
