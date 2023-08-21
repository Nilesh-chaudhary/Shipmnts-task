// const express = require("express");
// const router = express.Router();
// const VoteModel = require("../models/Vote");
const VoteModel = require("../models/Vote");

class VoteController {
  static voteupdate = async (req, res) => {
    try {
      const questionId = req.params.id;
      const userId = req.body.userId; // The ID of the user casting the vote
      const voteType = req.body.voteType; // "upvote" or "downvote"

      const existingVote = await VoteModel.findOne({
        user: userId,
        question: questionId,
      });

      if (existingVote) {
        existingVote.voteType = voteType;
        await existingVote.save();
      } else {
        const vote = new VoteModel({
          user: userId,
          question: questionId,
          voteType,
        });
        await vote.save();
      }

      res.json({ message: "Vote recorded successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while recording the vote" });
    }
  };
}

// Define the route using the controller method

module.exports = VoteController;
