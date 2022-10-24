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
    star: { type: Number, enum: [1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10], default: 10},
    date: { type: Date, default: new Date() },
    html: String,
    link: String,
    slug: String,


}, { timestamps: true, collection: "posts", versionKey: false })

const Post = mongoose.model("Post",PostSchema);

module.exports=Post;