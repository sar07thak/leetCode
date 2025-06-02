const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const redisClient = require("./config/redis");

const cookieParser = require("cookie-parser");
const userRouters = require("./routes/userRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/user", userRouters);

// ✅ Connect DB and start server
const IntializeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    app.listen(process.env.PORT, () => {
      console.log("Server started listening at port " + process.env.PORT);
    });
  } catch (err) {
    console.log("Error:", err.message);
  }
};

IntializeConnection();
