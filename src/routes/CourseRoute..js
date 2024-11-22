import express from "express";
import { getCourses } from "../controllers/CoursesContorller.js";

const courseRouter = express.Router();

courseRouter.get("/courses", getCourses);

export default courseRouter;
