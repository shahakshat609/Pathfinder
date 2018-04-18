var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const saltRounds = 5;
//var cors = require('cors');
var mongoose = require('mongoose');
//require('./passport')(passport);
//var passport=require('passport');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var users=require('../models/users.js');
var user_details=require('../models/userdetails.js');
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

//get method to get all user details 
router.get('/userdetails',function(req,res)
{
  if(req.session.email)
 {
   console.log(req.session.email);
  console.log('User details request API called');
  user_details.findOne({'email_address':req.session.email})
  .exec(function(err,users)
{
  if(err)
  {
    console.log("error in finding data from the users");
  }
  console.log(users);
    res.json(users);
})

  }
  else{
    res.json("Session not implemented");
  }
}
)









//signup API
router.post('/signup', function(req,res)
{
  console.log("Signup API called");
  var newusers=new users;
  console.log(req.body);
  newusers.email_address = req.body.email_address;
  newusers.username= req.body.username;
  newusers.password= req.body.password;
  
  console.log("Parameters taken successfully");
  //var length=req.body.password.length;

  
  newusers.save(function(err, inserteduser)
{
  console.log("Save function called");
  if(err)
  {
    console.log("Data not inserted into users since user already exists");
    console.log(err);
    res.json("Signup unsuccessful");
  }
  else if (newusers.password ==="" ||newusers.email_address==="" || newusers.username==="")
  {
     res.json("Missing some fill outs");
  }
  
  else{
    
    res.json("Signup Successful");
  }
})
  
  


});




//login API
router.post('/login1', function(req,res)
{
  console.log("Login API called");
  var newusers1=new users;
  newusers1.email_address = req.body.email_address;
  newusers1.username= req.body.username;
  newusers1.password= req.body.password;
  console.log(req.body.email_address);

  if(!req.body.email_address||!req.body.password)
  {
    console.log("Please fill out fields");
    res.json("Please fill out fields");
  }
else{
  users.findOne({'email_address':req.body.email_address})
  .exec(function(err,users)
{
  if(err)
  {
    console.log("error in finding data from the users");
    res.json("Please enter correct credentials");
  }
  
  else if(users.password===req.body.password)
  {
    console.log(users);
    console.log("Login Successful")
    req.session.email=newusers1.email_address;
    res.json("Login Successful");
   
    console.log(req.session.email);
  }
  
})
}

  //console.log(email);
  //console.log(password1);
  
  
}
);

passport.serializeUser(function(users, done) {
  done(null, users.email_address);
});

passport.deserializeUser(function(id, done) {
  users.getUserById(id, function(err, users) {
    done(err, users);
  });
});
passport.use( new LocalStrategy(
{
usernameField:'email_address',
passwordField:'password'

},
  function(username, password, done) {
  console.log('in passport');
  console.log(username);
  console.log(password);
  var query={'email_address':username}
 
  users.findOne(query)
  .exec(function(err,user)
{
  console.log(user);
  console.log(user.password);
  if (err) { return done(err); }
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  
  else if(user.password===password)
  {
    console.log(user);
    //console.log("Login Successful")
    //req.session.email=newusers1.email_address;
    return done(null, user);
   
    //console.log(req.session.email);
  }
  
})

}));



//passport.use('login',new LocalStrategy(
  //function(username, password, done) {
    //console.log("In PAssport Local Strategy method");
    //users.findOne({ username: req.body.email_address }, function (err, user) {
     // if (err) { return done(err); }
      //if (!user) {
        //return done(null, false, { message: 'Incorrect username.' });
      //}
      //if (!user.validPassword(password)) {
        //return done(null, false, { message: 'Incorrect password.' });
      //}
      //return done(null, user);
    //});
  //}
//));


router.post('/login',function(req,res){ 
  passport.authenticate('local', function(err, user, info) {
    console.log("Returned user in login api");
    console.log(user);
    console.log(user.email_address);
    

    if (err) 
    { 
      throw err; 
    }
    if (!user) 
    { 
       res.json("Login Failed");
   }
    else{
      
        req.session.email=user.email_address;
         res.json("Login Successful");
      
      
      //res.json();
      
    }
  

})(req,res);
}
);



//
router.get('/checklogin', function(req,res)
{
  //console.log("hi");
  if(req.session.email)
  {

    console.log("Already Logged in");
    res.json("Already Logged in");
    
  }
  else{
    console.log("Plz Log in");
    res.json("Please Login in");
    
  }
  });


router.post('/logout', function(req,res)
{

  req.session.destroy();
	console.log('Session destroyed');
res.json("Logged out successfully");


})


module.exports = router;