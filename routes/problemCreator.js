//create
//fetch
//delete
const express = require("express");
const Problem = require("../models/problem");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/create", adminMiddleware , createProblem);
router.patch("/:id", updateProblem);
router.delete("/:id", deleteProblem);

router.get("/:id", getProblemByID);
router.get("/", getAllProblem);
router.get("/user", solvedProblemByUser);
