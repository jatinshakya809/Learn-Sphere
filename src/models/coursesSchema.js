import mongoose from "mongoose";

const subItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Sub-item name is required"],
    trim: true,
    minlength: [3, "Sub-item name must be at least 3 characters long"],
  },
  duration: {
    type: String,
    required: [true, "Sub-item duration is required"],
    trim: true,
  },
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
    minlength: [3, "Item name must be at least 3 characters long"],
  },
  duration: {
    type: String,
    required: [true, "Item duration is required"],
    trim: true,
  },
  subItems: {
    type: [subItemSchema],
    default: [],
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure that subItems is not empty
      },
      message: "At least one sub-item is required.",
    },
  },
});

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Course ID is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [5, "Course title must be at least 5 characters long"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
    items: {
      type: [itemSchema],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
