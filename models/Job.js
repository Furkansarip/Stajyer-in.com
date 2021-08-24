const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcrypt')//Password hash için gerekli paket
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    companyName:{
        type:String,
    },
    jobTitle:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    description:{
        type:String,
        trim:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    slug:{
        type:String,
        unique:true
    }

  });
  JobSchema.pre('validate',function(next){
      this.slug=slugify(this.companyName,{
          lower:true,
          strict:true
      })
      this.slug+="-"+slugify(this.jobTitle,{
          lower:true,
          strict:true
      })
      next();
  })

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;