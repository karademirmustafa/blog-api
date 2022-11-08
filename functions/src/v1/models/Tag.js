const mongoose = require("mongoose");


const TagSchema = new mongoose.Schema({

    name:String,
    //++ continue later

},{versionKey:false,collection:"tags"})


const Tag = mongoose.model("Tag",TagSchema);

module.exports=Tag;