const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    replies:[],
    comment:String,
    date:{type:Date,default:Date.now}

},{timestamps:true,collection:"comments",versionKey:false})

const Comment = mongoose.model("Comment",CommentSchema);

module.exports=Comment;