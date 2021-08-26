const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //Password hash için gerekli paket
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
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
  }
    
  ]
   
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

const User = mongoose.model('User', UserSchema);
module.exports = User;
