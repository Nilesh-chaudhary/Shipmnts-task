const express = require("express");
const router = express.Router();
const VoteController = require("../controllers/voteController.js");

router.post("/questions/:id/vote", VoteController.voteupdate);

module.exports = router;
