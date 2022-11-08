const { insert, index } = require("../services/auth");
const httpStatus = require("http-status");

const register = async (req, res, next) => {
  const {email,password}=req.body;
  insert(email,password)
    .then((response) => {
      
      if(response.status===201){
        return sendToken(response.data,201,res);
      }
     return res.status(response.status).json(response.message);
      
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  index(email, password)
    .then((response) => {

      if (response.status === 200) {
       return sendToken(response.data, 200, res);
      }
    return  res.status(response.status).json(response.message)
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    });
};



const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ succes: true, token });
};

module.exports = {
  register,
  login
};
