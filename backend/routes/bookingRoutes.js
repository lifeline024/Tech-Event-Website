import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, referenceId, course,amount} = req.body;
    const booking = new Booking({ name, email, phone, referenceId, course,amount });
    await booking.save();
    res.json({ message: 'Booking received successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save booking' });
  }
});

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
});

export default router;
