import express from "express";
import {
  adminsignup,
  adminsignin,
  stundetsignup,
  studentsignin,
  getquestionset,
} from "../controllers/auth.controller.js";
import {
  createQuestions,
  getQuestionsByRoomId,
} from "../controllers/questionController.js";
import { saveResults, getLeaderboard } from "../controllers/results.controller.js";

const router = express.Router();

// Auth routes
router.post("/adminsignup", adminsignup);
router.post("/adminsignin", adminsignin);
router.post("/studentsignup", stundetsignup);
router.post("/studentsignin", studentsignin);

// Question routes
router.post("/questions", createQuestions);
router.get("/questions/:roomID", getQuestionsByRoomId);
router.get("/getquestionset", getquestionset);
router.post("/saveresults", saveResults);
router.get("/leaderboard/:roomId", getLeaderboard);
export default router;
