import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedCourses = async () => {
  await connectDB();

  const sampleCourses = [
    {
      title: "Full Stack Web Development",
      description: "Learn MERN Stack from scratch",
      duration: "6 months",
      price: 15000,
    },
    {
      title: "Data Science Essentials",
      description: "Learn Python, Pandas, and ML basics",
      duration: "3 months",
      price: 10000,
    },
    {
      title: "Frontend Development",
      description: "HTML, CSS, JavaScript, and React",
      duration: "2 months",
      price: 8000,
    },
  ];

  try {
    await Course.deleteMany(); // Clear existing data
    await Course.insertMany(sampleCourses);
    console.log("Courses Added successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCourses();
