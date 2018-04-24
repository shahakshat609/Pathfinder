var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');

var Schema =mongoose.Schema;

//user schema has been created.. Blueprint of the table.
var jobseeker_ques_Schema = new Schema({    
    email_address:String,
ques1:String,
ques2:String,
ques3:String,
ques4:String,
ques5:String,
ques6:String
});

//first arg:name of the model
//second arg: schema used
//third arg: collections to which schema has to be applied
module.exports =mongoose.model('jobseeker_questions',jobseeker_ques_Schema,'jobseeker_questions');