import React, { useState } from "react";
import axios from "axios";

export default function AdminAddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/courses", course);
      alert("Course added successfully!");
      setCourse({ title: "", description: "", duration: "", price: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding course!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={course.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={course.description} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input type="text" name="duration" className="form-control" value={course.duration} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={course.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Course</button>
      </form>
    </div>
  );
}
