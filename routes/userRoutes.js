const express = require("express");
const router = express.Router();
const { register } = require("../controllers/userAuthentication");
const { login } = require("../controllers/userAuthentication");
const { logout } = require("../controllers/userAuthentication");

//! Routes which have to made in userRoutes
//* Resgister
//* Login
//* Logout
//* GetProfile

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
// router.post("/getProfile", getProfile);

module.exports = router;
