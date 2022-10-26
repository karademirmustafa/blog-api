const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({

    title: String,
    description: String,
    content: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
    image: String,
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    date: { type: Date, default: new Date() },
    html: String,
    link: String,
    slug: String,
    isApproved:{type:Boolean,default:false},
    approvedBy:{type:mongoose.Types.ObjectId,ref:"User"}

}, { timestamps: true, collection: "posts", versionKey: false })

const Post = mongoose.model("Post",PostSchema);

module.exports=Post;