const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name:String,
    superSubject:Array // ??
},{versionKey:false,collection:"subjects"})

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports=Subject;