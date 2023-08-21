const QuestionModel = require("../models/Question");
// import QuestionModel from "../models/Question";

class questionController {
  // router.post("/questions",
  static createquestion = async (req, res) => {
    try {
      const { title, body, tags, userId } = req.body; // userId is the ID of the user creating the question

      const question = new QuestionModel({
        title,
        body,
        tags,
        user: userId,
      });

      await question.save();

      res
        .status(201)
        .json({ message: "Question created successfully", question });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  //   router.put("/questions/:id",
  static updatequestion = async (req, res) => {
    try {
      const questionId = req.params.id;
      console.log(questionId);
      const { title, body, tags } = req.body;

      const question = await QuestionModel.findByIdAndUpdate(
        questionId,
        { title, body, tags },
        { new: true } // Return the updated question
      );

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json({ message: "Question updated successfully", question });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the question" });
    }
  };

  //   router.delete("/questions/:id",
  static deletequestion = async (req, res) => {
    try {
      const questionId = req.params.id;

      const question = await QuestionModel.findByIdAndDelete(questionId);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json({ message: "Question deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the question" });
    }
  };

  // router.get("/questions",
  static getallquestion = async (req, res) => {
    try {
      const questions = await QuestionModel.find().populate(
        "user",
        "name email"
      ); // Populate user field with name and email

      res.json({ questions });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching questions" });
    }
  };

  //   router.get("/questions/search",
  static searchquestion = async (req, res) => {
    try {
      const keyword = req.query.keyword; // Get the search keyword from the query string

      const questions = await QuestionModel.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } }, // Case-insensitive title search
          { body: { $regex: keyword, $options: "i" } }, // Case-insensitive body search
        ],
      });

      res.json({ questions });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while searching questions" });
    }
  };

  //   router.get("/questions/sort",
  static sortquestion = async (req, res) => {
    try {
      const sortBy = req.query.sortBy; // Get the sorting criteria from the query string

      const validSortFields = ["createdAt", "title"]; // Define valid sorting fields
      if (!validSortFields.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort criteria" });
      }

      const questions = await QuestionModel.find().sort({ [sortBy]: 1 }); // 1 for ascending, -1 for descending

      res.json({ questions });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while sorting questions" });
    }
  };
}

module.exports = questionController;
