const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function adminMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;
    console.log("Token from cookie:", token);

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const payload = jwt.verify(token, process.env.JWTKEY);
    console.log("Decoded token:", payload);

    const { _id } = payload;

    if (!_id) {
      throw new Error("id is missing");
    }

    const result = await User.findById(_id);
    console.log("User fetched from DB:", result);

    if (!result) {
      throw new Error("User Doesn't Exist");
    }

    if (payload.role !== "admin") {
      throw new Error("Invalid Token: Not an admin");
    }
    req.result = result;
    next();
  } catch (err) {
    res.status(401).send("Invalid token: " + err.message);
  }
}

module.exports = adminMiddleware;
