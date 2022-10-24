const mongoose = require("mongoose");


const FavoriteSubjectSchema = new mongoose.Schema({

    subjects:[{type:mongoose.Types.ObjectId,ref:"Subject"}],
    userId:{type:mongoose.Types.ObjectId,ref:"User"}

},{timestamps:true,collection:"favorite_subjects", versionKey: false})


const FavoriteSubject = mongoose.model("FavoriteSubject",FavoriteSubjectSchema);

module.exports=FavoriteSubject