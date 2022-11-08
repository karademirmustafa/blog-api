const User = require("../models/User");
const ErrorResponse = require("../scripts/utils/errorResponse");



const insert = async (email, password) => {
  if (!email || !password) {
    return { status: 401, message: "Kaydolmak için Email ve şifrenizi giriniz!" }
  }

  const user = await User.findOne({ email });
  if (user) {
    return { status: 403, message: "Bu email adresine ait başka kullanıcı mevcuttur!" };
  }

  const newUser = await User.create({
    email,
    password
  });

  return { status: 201, message: "Kullanıcı başarıyla oluşturuldu.", data: newUser }

}

const index = async (email, password) => {

  if (!email || !password) {
    return { status: 401, message: "Email ve şifrenizi giriniz!" }

  }
  const user = await User.findOne({ email }).select("+password");
  //invalid credentials
  if (!user) {

    return { status: 403, message: "Bu emaile sahip herhangi bir kullanıcı bulunamadı." }
  }
  const isMatch = await user.matchPasswords(password);

  if (!isMatch) {

    return { status: 403, message: "Şifreniz yanlış. Lütfen tekrar deneyiniz!" }
  }


  return { status: 200, data: user }


}



const forgotPassword = async (phone) => {
  if (!phone) {
    return new ErrorResponse("Lütfen telefon numaranızı giriniz.", 401)
  }
  const user = await User.findOne({ phone })

  if (!userIsExist) {
    return new ErrorResponse("Bu numaraya ait bir kullanıcı yoktur.", 404)
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();



}

module.exports = {
  insert,
  index
}

