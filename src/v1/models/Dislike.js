const mongoose = require("mongoose");


const DislikeSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    date:{type:String,default:Date.now}
},{timestamp:true,collection:"dislikes", versionKey: false})

const Dislike = mongoose.model("Dislike",DislikeSchema);
module.exports=Dislike;