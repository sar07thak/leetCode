const express = require("express");
require('dotenv').config();
const main = require("./config/db");
const cookieParser = require("cookie-parser"); 

const app = express();

app.use(express.json()); 
app.use(cookieParser()); 

main()
  .then(() => app.listen(process.env.PORT, () => {
    console.log("Server started listening at port " + process.env.PORT);
  }))
  .catch((err) => console.log("Error:", err.message));
