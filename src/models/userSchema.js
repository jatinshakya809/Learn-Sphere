import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // Ensure the username is unique
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
      },
      purchasedCourses: [
        {
          type: mongoose.Schema.Types.ObjectId, // Referencing Course IDs
          ref: 'Course', // Reference the "Course" model
        },
      ],
    }, {
      timestamps: true,  // Automatically add `createdAt` and `updatedAt` fields
    }
);

const User = mongoose.model("USER",userSchema);
export default User;