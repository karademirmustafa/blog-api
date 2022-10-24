const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    fullName: String,
    firstName: String,
    lastName: String,
    password: { type: String, trim: true },
    blocks: Array,
    role: { type: String, defalt: "user", lowercase: true }, //user,writer,admin maybe increment
    images: Array,
    email: String,
    followers: Array,
    followings: Array,
    favorites: Array, // later two collection 1-FavoriteSubjects for subject ,2-toReadList for reading
    dateofbirth: String,
    gender: { type: String, enum: ["male", "female"] },
    city: String,
    about: String,
    socialMedia: Array,
    lastLogin: { type: Boolean, default: Date.now },

}, { timestamps: true, versionKey: false, collection: "users" })


const User = mongoose.model("User", UserSchema);


module.exports = User;