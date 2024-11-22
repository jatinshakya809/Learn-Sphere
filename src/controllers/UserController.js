import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUser = await User.findOne({ username: username });

    if (findUser) {
      res.status(402).json({
        message: "user already registered try different username",
        success: false,
      });
    }

    const saltround = 8;

    const hashPassword = await bcrypt.hash(password, saltround);

    const user = new User({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username: username });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    const authToken = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.cookie("authToken", authToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      authToken,
      message: "Login successful!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Profile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT payload
    const user = await User.findById(userId).select(
      "username purchasedCourses"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const ProtectedRoutes = async (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
};
