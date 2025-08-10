import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// POST /api/registration/register
router.post("/register", async (req, res) => {
  try {
    const { eventId, participantName, registrationNo, mobileNo, email, transactionId } = req.body;

    if (!eventId || !participantName || !registrationNo || !mobileNo || !email || !transactionId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newRegistration = new Registration({
      eventId,
      participantName,
      registrationNo,
      mobileNo,
      email,
      transactionId
    });

    await newRegistration.save();
    res.json({ success: true, message: "Registration successful!" });
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// Admin: Get all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin: Get registrations for a specific event
router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId }).populate("eventId");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
