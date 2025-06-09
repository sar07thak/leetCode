const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");

const cookieParser = require("cookie-parser");
const userRouters = require("./routes/userRoutes");
const problemRouters = require("./routes/problemCreator");
const submissionRouters = require("./routes/submit");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/user", userRouters);
app.use("/problem" , problemRouters);
app.use("/submission" , submissionRouters);

// ✅ Connect DB and start server
main().then(() => {
  app.listen(process.env.PORT , ()=>{
    console.log("Server listen at port");
  })
}).catch((err) => {
  console.log("Error : " + err.message );
})
