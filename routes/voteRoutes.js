import express from "express";
const router = express.Router();
import VoteController from "../controllers/voteController.js";

router.post("/questions/:id/vote", VoteController.voteupdate);

export default router;
