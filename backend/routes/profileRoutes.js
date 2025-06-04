import express from 'express';   // Import express
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Contact from '../models/Contact.js';

const router = express.Router();  // Create router instance

// GET /api/profile/user/:email
// routes/profile.js

// 1. Get user by email
router.get("/user/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// 2. Get bookings by email
router.get("/bookings/:email", async (req, res) => {
  const bookings = await Booking.find({ email: req.params.email });
  res.json(bookings);
});

// 3. Check if user has messages
router.get("/messages/:email", async (req, res) => {
  const messages = await Contact.find({ email: req.params.email });
  res.json({ hasMessaged: messages.length > 0 });
});



export default router;
