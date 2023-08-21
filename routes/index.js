const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const questionRouter = require("./questionroutes.js");
const userRouter = require("./userRoutes.js");
const voteRouter = require("./voteRoutes.js");

router.get("/", (req, res) => {
  res.send("Welcome to stack overflow clone");
});

router.use("/question", questionRouter);
router.use("/vote", voteRouter);
router.use("/user", userRouter);

module.exports = router;
