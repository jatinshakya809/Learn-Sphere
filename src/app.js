import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import courseRouter from "./routes/CourseRoute..js";

const app = express();

const corsOptions = {
  origin: "https://learn-sphere-zeta.vercel.app", // Make sure this is the correct frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // You can expand this if needed
  credentials: true, // Make sure to allow credentials (cookies)
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Include Cookie in allowed headers
};

app.use(cors(corsOptions));

dotenv.config({ path: "../.env" });

app.use(express.json());

app.use(cookieparser());

app.use(express.urlencoded({ extended: true }));

app.use("/user/v2", userRouter);
app.use("/course/v2", courseRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/cookie", (req, res) => {
  res.send(req.cookies);
  console.log(req.cookies);
});

export default app;
