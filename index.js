const express = require("express");
const app = express();
const config = require("./src/v1/config"); 
const loaders = require("./src/v1/config"); 

//dotenv config
config();
//DB configuration
loaders();






const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running :${PORT}`)
})
