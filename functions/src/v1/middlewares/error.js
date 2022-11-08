const ErrorResponse = require("../scripts/utils/errorResponse");
// const {errLogger} = require("../scripts/logger/logger");

const errorHandler = (err, req, res, next) => {
// if(err){
//   const method = req.method;
//   const action = req.path;
//   const body = req.body;
//   const params = req.params;
//   const query = req.query;
//   errLogger.log({
//     level: "error",
//     message: err,
//     meta:{
//       method,
//       action,
//       params,
//       body,
//       query,
//     }
//    })
// }
   
  let error = { ...err };

  error.message = err.message;


  if (err.code === 11000) {
    const message = `Yinelenen değeri girdiniz. Tekrar deneyiniz.`;

    error = new ErrorResponse(message, 400);
  } 

  if(err.name === "ValidationError"){
      const message = Object.values(err.errors).map((val)=> {val.message;});
      error = new ErrorResponse(message,400);
  }

  res.status(error.statusCode || 500).json({
      status: false,
      message : error.message || "Server Error"
  })

};

module.exports = errorHandler;