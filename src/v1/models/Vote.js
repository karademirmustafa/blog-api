const mongoose = require("mongoose");


const VoteSchema = new mongoose.Schema({
    postId:{type:mongoose.Types.ObjectId,ref:"Post"},
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    date:{type:String,default: Date.now},
    star:{type:Number,enum:[1-2-3-4-5-6-7-8-9-10]}

},{collection:"votes",versionKey:false})


const Vote = mongoose.model("Vote",VoteSchema);

module.exports=Vote;