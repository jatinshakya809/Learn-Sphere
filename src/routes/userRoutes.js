import express from "express";
import {
  Register,
  Login,
  Profile,
  Logout,
  ProtectedRoutes,
} from "../controllers/UserController.js";
import authenticate from "../utils/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", Register);

userRouter.post("/login", Login);

userRouter.get("/dashboard", authenticate, Profile);

userRouter.post("/logout", authenticate, Logout);

userRouter.get("/auth/check", authenticate, ProtectedRoutes);

export default userRouter;
