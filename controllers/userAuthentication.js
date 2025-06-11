const user = require("../models/user"); //* user-model-schema
const submissions = require("../models/submissions") //* submission schema
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    });

    const token = jwt.sign(
      {
        firstName: firstName,
        emailId: emailId,
        _id: newUser._id,
        role: newUser.role,
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

const adminRegister = async (req, res) => {
  try {
    // validate(req.body);
    console.log("req.body:", req.body); // DEBUG LINE
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Bad Request: Request body is empty");
    }

    const { firstName, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);
    req.body.role = "admin";
    const newUser = await user.create({
      firstName,
      emailId,
      password: req.body.password,
      role: "admin",
    });

    const token = jwt.sign(
      {
        firstName: firstName,
        emailId: emailId,
        _id: newUser._id,
        role: newUser.role,
      },
      process.env.JWTKEY,
      { expiresIn: 3600 }
    );
    res
      .status(201)
      .cookie("token", token)
      .send("admin register sucessfully ! ");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id ;

    //! deletion from userSchema and users List 
    await user.findByIdAndDelete(userId) ;
    
    //!  now we have to delete from Submission whatever user sumbit in submissions
    await submissions.deleteMany({userId});

    res.status(200).send("Deleted sucessfully :-)");
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  adminRegister,
  deleteProfile,
};
