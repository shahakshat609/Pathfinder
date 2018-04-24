var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jobposter=require('../models/jobposter.js');
var mongoSessionURL = 'mongodb://shahakshat:Axtshah14@ds223509.mlab.com:23509/freelancer';
var db='mongodb://shahakshat:Axtshah14@ds247449.mlab.com:47449/pathfinder_app';
mongoose.Promise=global.Promise;
mongoose.connect(db,function(err)
{
  console.log(db);
  if(err)
  {
    console.log("Error" +err);
  }
  else{
    console.log("Connected to Mongodb");
  }
})


//Get Jobseeker Questions

router.post('/jobposts',function(req,res)
{
    var jobposts=new jobposter;
    jobposts.industry=req.body.industry;
  
jobposter.find({"industry":req.body.industry})
  .exec(function(err,questions)
{
  if(err)
  {
    console.log("error in finding JobSeeker Qurestions");
    res.json("error in finding JobSeeker Qurestions");
  }
  console.log(questions);
    res.json(questions);
})

}
)



//Post Answers for JobSeeker Questions
router.post('/post_job', function(req,res)
{
  console.log("Post jobs API called");
  var posts=new jobposter;
  console.log(req.body);
  posts.email_address = req.session.email;
  posts.company_name=req.body.company_name;
  posts.job_title=req.body.job_title;
  posts.job_summary=req.body.job_summary;
  posts.industry=req.body.industry;
  posts.key_skills=req.body.key_skills;
  posts.education=req.body.education;
  posts.experience_required=req.body.experience_required;
  posts.exp_years=req.body.exp_years;
  posts.perks=req.body.perks;
  console.log("Parameters taken successfully");
  //var length=req.body.password.length;

  
  posts.save(function(err, inserteduser)
{
  console.log("Save function called");
  if(err)
  {
    res.json("job posted unsucccessfully");
  }
 else{
    
    res.json("Job posted Successfully");
  }
})
});


//Change Questions to be asked to Jobseeker
router.put('/update_jobposting', function(req,res)
{
  

  
  console.log("Update Profile Details API called");
  //var newusers1=new jobseeker_questions;
  if(req.session.email)
 {
  //newusers1.About_me=req.body.about_me;
  //newusers1.skills=req.body.skills;
  //var length=newusers.password.length;
  jobposter.findOneAndUpdate(
    {'email_address':req.session.email},
    {
      $set:
      {email_address : req.session.email,
        company_name:req.body.company_name,
        job_title:req.body.job_title,
        job_summary:req.body.job_summary,
        key_skills:req.body.key_skills,
        education:req.body.education,
        experience_required:req.body.experience_required,
        exp_years:req.body.exp_years,
        perks:req.body.perks,
        industry:req.body.industry
        
        
        
        
        

      }
    },
    
    {
      new:true
      },
    
    function(err, updatedques)
{
  if(err)
  {
    console.log("Data not updated");
     res.json("Updation unsuccessful");
  }
  else{
    console.log("Updated successfuly");
    res.json("Updated successfuly");
  }

  
})}
else
{
    res.json("Unauthorized Access")
}
  
});


module.exports=router;