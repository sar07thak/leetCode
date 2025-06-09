const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userAuthentication");
const { login } = require("../controllers/userAuthentication");
const { logout } = require("../controllers/userAuthentication");
const { adminRegister } = require("../controllers/userAuthentication");
const adminMiddleware = require("../middleware/adminMiddleware");

//! Routes which have to made in userRoutes
//* Resgister
//* Login
//* Logout

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/admin/register", adminMiddleware , adminRegister);



module.exports = router;
