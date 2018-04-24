var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jobseeker_questions=require('../models/jobseeker_questions.js');
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

router.get('/questions',function(req,res)
{
  
jobseeker_questions.find()
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
router.post('/answers', function(req,res)
{
  console.log("Post Answers for JobSeeker Questions API called");
  var answers=new jobseeker_questions;
  console.log(req.body);
  answers.email_address = req.session.email;
  answers.ques1=req.body.answer1;
  answers.ques2=req.body.answer2;
  answers.ques3=req.body.answer3;
  answers.ques4=req.body.answer4;
  answers.ques5=req.body.answer5;
  answers.ques6=req.body.answer6;
  console.log("Parameters taken successfully");
  //var length=req.body.password.length;

  
  answers.save(function(err, inserteduser)
{
  console.log("Save function called");
  if(err)
  {
    res.json("Answers not posted succcessfully");
  }
 else{
    
    res.json("Answered Successfully");
  }
})
});


//Change Questions to be asked to Jobseeker
router.put('/update_questions', function(req,res)
{
  

  
  console.log("Update Profile Details API called");
  var newusers1=new jobseeker_questions;
  if(req.session.email==="admin")
 {
  //newusers1.About_me=req.body.about_me;
  //newusers1.skills=req.body.skills;
  //var length=newusers.password.length;
  users.findOneAndUpdate(
    {'email_address':req.session.email},
    {
      $set:
      {ques1:req.body.ques1,
        ques2:req.session.ques2,
        ques3:req.session.ques3,
        ques4:req.session.ques4,
        ques5:req.session.ques5,
        ques6:req.session.ques6

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