import Course from "../models/coursesSchema.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
