const mongoose = require("mongoose");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    fullName: String,
    firstName: String,
    lastName: String,
    password: { type: String, trim: true },
    blocks: Array,
    role: { type: String, default: "user", lowercase: true }, //user,writer,admin maybe increment
    images: Array,
    email: {type:String,unique:true},
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


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password,this.password);
}
UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id,role:this.role,username:this.username,fullName:this.fullName }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    this.resetPasswordExpire = Date.now() + 10*(60*1000);
    return resetToken;
  
  }
const User = mongoose.model("User", UserSchema);


module.exports = User;