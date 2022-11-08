const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../scripts/utils/errorResponse");
const admin = require("../config/firebase-config");

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        //Bearer tokenadfsda321431243214321
        token = req.headers.authorization.split(" ")[1];
      }
    if (!token) {
        return next(new ErrorResponse("Erişim yetkiniz yok.", 401));
      }

  try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return next(new ErrorResponse("JWT token doğrulanamadı.", 401));
      }
      if(decoded){
      const user = await User.findById(decoded.id);
         if (!user) {
          return next(new ErrorResponse("Böyle bir kullanıcı bulunamadı.", 404));
         }
      
   req.user = user;
      return next();
    } 

    res.status(401).json({ status:false,message: "Yetkiniz yok" });
  } catch (error) {
    return res.status(500).json({ status:false, message: "Görüntüleme Yetkiniz yok." });
  }
};

exports.firebaseVerify = async (req, res, next) => {
  try {
    const { firebase_token } = req.body;
    
    const decodeValue = await admin.auth().verifyIdToken(firebase_token);
    if (decodeValue) {
      req.user= decodeValue;
      console.log(decodeValue)
      return next()
    } else {
      return res.status(401).json({ status:false,message: "Geçersiz bir token girdiniz." });
    }
  } catch (error) {
    return res.status(500).json({ status:false,message: "Geçersiz bilgi girdiniz." });
  }
};