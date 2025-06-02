//create
//fetch
//delete
const express = require("express");
const Problem = require("../models/problem");
const router = express.Router();

router.post("/create" , problemCreate);
router.patch("/:id",problemUpdate);
router.delete("/:id",problemDelete);


router.get('/:id' , problemFetch);
router.get("/" , getAllProblem );
router.get("/user",solvedProblem);
