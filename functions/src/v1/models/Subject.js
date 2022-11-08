const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name:String,
    superSubject:new mongoose.Schema({
        name:String
    }) // ??
},{versionKey:false,collection:"subjects"})

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports=Subject;