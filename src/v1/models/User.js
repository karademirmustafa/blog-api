const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    fullName: String,
    firstName: String,
    lastName: String,
    password: { type: String, trim: true },
    blocks: Array,
    role: { type: String, default: "user", lowercase: true }, //user,writer,admin maybe increment
    images: Array,
    email: String,
    followers: {type:Array,default:[]},
    followings: {type:Array,default:[]},
    favorites: [{type:mongoose.Types.ObjectId,ref:"Subject"}], // later two collection 1-FavoriteSubjects for subject ,2-toReadList for reading
    toReadList:[{type:mongoose.Types.ObjectId,ref:"Post"}],
    dateofbirth: String,
    gender: { type: String, enum: ["male", "female"] },
    city: String,
    about: String,
    socialMedia: Array,
    lastLogin: { type:Date, default: Date.now },

}, { timestamps: true, versionKey: false, collection: "users" })


const User = mongoose.model("User", UserSchema);


module.exports = User;