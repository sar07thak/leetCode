const user = require("../models/user"); //* user-model-schema
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstName, password, emailId } = req.body;
    //* validate user
    validate(req.body);

    req.body.password = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      firstName,
      emailId,
      password: req.body.password,
    });

    const token = jwt.sign(
      { firstName: firstName , emailId: emailId , _id: newUser._id },
      process.env.JWTKEY,
      { expiresIn: 3600 }
    );

    res.status(201).cookie("token", token).send("user register sucessfully ! ");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId) throw new Error("invalid email");

    if (!password) throw new Error("invalid passwprd");

    const fetchUser = await user.findOne({ emailId });
    const ans = await bcrypt.compare( password , fetchUser.password );

    if (!ans) throw new Error("Invalid ans");

    const token = jwt.sign(
      { firstName: fetchUser.firstName, emailId: emailId, _id: fetchUser._id },
      process.env.JWTKEY,
      { expiresIn: 3600 }
    );
    res.status(200).cookie("token", token).send("user Login sucessfully ! ");
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logout sucessfully !");
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
};
