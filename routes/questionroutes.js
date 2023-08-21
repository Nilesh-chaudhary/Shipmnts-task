import express from "express";
const router = express.Router();
import checkUserAuth from "../middlewares/auth-middleware.js";
import questionController from "../controllers/questionController.js";

// Route level Middleware
// router.use("/changepassword", checkUserAuth);
// router.use("/loggeduser", checkUserAuth);

// PUBLIC ROUTE
router.post("/questions", questionController.createquestion);
router.put("/questions/:id", questionController.updatequestion);
router.delete("/questions/:id", questionController.deletequestion);
router.get("/questions", questionController.getallquestion);
router.get("/questions/search", questionController.searchquestion);
router.get("/questions/sort", questionController.sortquestion);

export default router;
