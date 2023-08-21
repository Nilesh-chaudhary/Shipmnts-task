const VoteModel = require("../models/Vote");

class VoteController {
  static voteupdate = async (req, res) => {
    try {
      const questionId = req.params.id;
      const userId = req.body.user; // The ID of the user casting the vote
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

      res.json({
        message: "vote recorded successfully",
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = VoteController;
