import express from "express";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register for event
router.post("/register", async (req, res) => {
  const { eventId, participantName, registrationNo, mobileNo, transactionId } = req.body;

  if (!eventId || !participantName || !registrationNo || !mobileNo || !transactionId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newReg = new Registration({
      eventId,
      participantName,
      registrationNo,
      mobileNo,
      transactionId
    });
    await newReg.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get registrations for a specific event
router.get("/registrations/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
