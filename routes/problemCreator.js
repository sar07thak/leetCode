//create
//fetch
//delete
const express = require("express");
const Problem = require("../models/problem");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const  {createProblem , updateProblem , deleteProblem ,
    getAllProblem ,getProblemByID ,solvedProblemByUser
}  = require("../controllers/userProblem");
const userMiddleware = require("../middleware/userMiddleware");


//* Admin specific api requests
router.post("/create", adminMiddleware , createProblem);
router.put("/update/:id", adminMiddleware , updateProblem);
router.delete("/delete/:id", adminMiddleware , deleteProblem);

//* User specific api requests
router.get("/problemById/:id", userMiddleware , getProblemByID);
router.get("/getAllProblem", userMiddleware ,  getAllProblem);
router.get("/problemSolvedByUser", userMiddleware , solvedProblemByUser);


module.exports = router ;