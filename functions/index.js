const functions = require("firebase-functions");
const express = require("express");
const app =express();
const cors = require("cors");
const config =require("./src/v1/config");
const loaders = require("./src/v1/loaders")

config();
loaders();

//process.env.MONGO_URI erişebilmek için config() altında olmalıdır.
const errorHandler = require("./src/v1/middlewares/error")

app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit: '1024mb', extended: true}));
app.use(cors());


app.use("/api/authenticate",require("./src/v1/routes/auth"))


app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT,(req,res)=> {
//     console.log("sunucu bağlantısı başarılı.")
// })

exports.app =functions.https.onRequest(app);

