import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: String,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;   // <-- Make sure this line is here
