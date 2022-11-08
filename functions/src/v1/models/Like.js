const mongoose = require("mongoose");


const LikeSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    date:{type:String,default:Date.now}
},{timestamp:true,collection:"likes", versionKey: false})

const Like = mongoose.model("Like",LikeSchema);
module.exports=Like;