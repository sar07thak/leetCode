const user = require("../models/user"); //* user-model-schema
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const register = async (req, res) => {
  try {
    const { firstName, password, emailId } = req.body;
    //* validate user
    validate(req.body);

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "user";
    const newUser = await user.create({
      firstName,
      emailId,
      password: req.body.password,
      role: "user",
    });

    const token = jwt.sign(
      {
        firstName: firstName,
        emailId: emailId,
        _id: newUser._id,
        role: "user",
      },
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

    if (!password) throw new Error("invalid password");

    const fetchUser = await user.findOne({ emailId });
    const ans = await bcrypt.compare(password, fetchUser.password);

    if (!ans) throw new Error("Invalid ans");

    const token = jwt.sign(
      {
        firstName: fetchUser.firstName,
        emailId: emailId,
        _id: fetchUser._id,
        role: fetchUser.role,
      },
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
    res.status(200).send("Logout successful!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

// const adminRegister = async (req, res) => {
//    try{
//         validate(req.body);
//         const {firstName, emailId, password}  = req.body;

//         req.body.password = await bcrypt.hash(password, 10);

//        const user =  await user.create(req.body);
//        const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWTKEY,{expiresIn: 60*60});
//        res.cookie('token',token,{maxAge: 60*60*1000});
//        res.status(201).send("User Registered Successfully");
//       }
//       catch(err){
//           res.status(400).send("Error: "+err);
//       }
// };

module.exports = {
  register,
  login,
  logout,
  // adminRegister,
};
