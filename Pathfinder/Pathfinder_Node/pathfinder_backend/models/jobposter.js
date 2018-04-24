var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var timestamps = require('mongoose-timestamp');

var Schema =mongoose.Schema;

//user schema has been created.. Blueprint of the table.
var jobposting_Schema = new Schema({    
    email_address:String,
    company_name:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
job_summary:String,
key_skills:String,
education:String,
industry:String,
experience_required:String,
exp_years:String,
perks:String
});


jobposting_Schema.plugin(timestamps);
//first arg:name of the model
//second arg: schema used
//third arg: collections to which schema has to be applied
module.exports =mongoose.model('jobposting',jobposting_Schema,'jobposting');