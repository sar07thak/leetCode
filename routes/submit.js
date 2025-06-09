const express = require("express");
const userMiddleware = require("../middleware/userMiddleware");
const router = express.Router();
const { submitCode, runCode } = require("../controllers/userSubmission");

router.post("/submit/:id", userMiddleware, submitCode);
router.post("/run/:id", userMiddleware , runCode)   ;

module.exports = router;
