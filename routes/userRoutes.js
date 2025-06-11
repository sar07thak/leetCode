const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userAuthentication");
const { login } = require("../controllers/userAuthentication");
const { logout } = require("../controllers/userAuthentication");
const { adminRegister } = require("../controllers/userAuthentication");
const { deleteProfile } = require("../controllers/userAuthentication");
const adminMiddleware = require("../middleware/adminMiddleware");
const userMiddleware = require("../middleware/userMiddleware");

//! Routes which have to made in userRoutes
//* Resgister
//* Login
//* Logout

router.post("/register", register); //* user register

router.post("/login", login); //* login user

router.post("/logout", logout); //* logout user

router.post("/admin/register", adminMiddleware, adminRegister); //* admin register

router.delete("/deleteProfile", userMiddleware, deleteProfile); //*user profile deleteion 

module.exports = router;
