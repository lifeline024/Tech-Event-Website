// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const events = [
  {
    name: "Hackathon",
    teamSize: "4-5 Members (1 Girl)",
    entryFee: 250,
    dateTime: "2025-09-15 10:00 AM",
    instructions: "Bring your own laptop and charger.",
    prizeMoney: "₹10,00",
    venue: "Auditorium Hall",
    image: "pg&imgrefurl=https%3A%2F%2Fwww.guvi.in%2Fblog%2Fcategory%2Fhackathon%2F&docid=_XYk7c_aeVJuEM&tbnid=gwUm59ZiNrNEMM&vet=12ahUKEwj4k_C-kICPAxXcm2MGHdYRMQcQM3oECCYQAA..i&w=2560&h=1705&hcb=2&ved=2ahUKEwj4k_C-kICPAxXcm2MGHdYRMQcQM3oECCYQAA"
  },
  {
    name: "Coding Challenge",
    teamSize: "1-2 Members",
    entryFee: 160,
    dateTime: "2025-08-15 2:00 PM",
    instructions: "Languages allowed: C, C++, Java, Python.",
    prizeMoney: "₹5,000",
    venue: "Lab 101",
    image: "data:image/jpeg;base64,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"
  },
  {
    name: "BGMI Tournament",
    teamSize: "4 Members",
    entryFee: 160,
    dateTime: "2025-08-16 11:00 AM",
    instructions: "Bring your own mobile devices.",
    prizeMoney: "₹3,000",
    venue: "Sports Arena",
    image: "https://example.com/bgmi.jpg"
  },
  {
    name: "FREE FIRE Tournament",
    teamSize: "4 Members",
    entryFee: 160,
    dateTime: "2025-08-16 11:00 AM",
    instructions: "Bring your own mobile devices.",
    prizeMoney: "₹3,000",
    venue: "Sports Arena",
    image: "https://example.com/bgmi.jpg"
  },
  {
    name: "Weight Lifting",
    teamSize: "Single",
    entryFee: 150,
    dateTime: "2025-08-16 3:00 PM",
    instructions: "Proper sports gear required.",
    prizeMoney: "₹2,000",
    venue: "Gym Hall",
    image: "https://example.com/weightlifting.jpg"
  },
  {
    name: "Dance Competition",
    teamSize: "Solo or Group",
    entryFee: 250,
    dateTime: "2025-08-17 6:00 PM",
    instructions: "Time limit: 5 minutes.",
    prizeMoney: "₹4,000",
    venue: "Main Stage",
    image: "https://example.com/dance.jpg"
  },
  {
    name: "Singing Competition",
    teamSize: "Solo",
    entryFee: 200,
    dateTime: "2025-08-17 4:00 PM",
    instructions: "Bring your karaoke track.",
    prizeMoney: "₹3,000",
    venue: "Music Hall",
    image: "https://example.com/singing.jpg"
  },
  {
    name: "Chess",
    teamSize: "Single",
    entryFee: 100,
    dateTime: "2025-08-18 9:00 AM",
    instructions: "Standard chess rules apply.",
    prizeMoney: "₹1,500",
    venue: "Room 202",
    image: "https://example.com/chess.jpg"
  },
  {
    name: "Treasure Hunt",
    teamSize: "3-5 Members",
    entryFee: 300,
    dateTime: "2025-08-18 2:00 PM",
    instructions: "Follow clues to find treasure.",
    prizeMoney: "₹2,500",
    venue: "Campus Ground",
    image: "https://example.com/treasure.jpg"
  },
  {
    name: "Video & Photography",
    teamSize: "1-2 Members",
    entryFee: 150,
    dateTime: "2025-08-19 11:00 AM",
    instructions: "Submit work before deadline.",
    prizeMoney: "₹2,000",
    venue: "Media Lab",
    image: "https://example.com/photography.jpg"
  },
  {
    name: "Modeling",
    teamSize: "Single",
    entryFee: 300,
    dateTime: "2025-08-19 6:00 PM",
    instructions: "Groups must be single-gender.",
    prizeMoney: "₹5,000",
    venue: "Main Stage",
    image: "https://example.com/modeling.jpg"
  },
  {
    name: "Project Expo",
    teamSize: "2-4 Members",
    entryFee: 400,
    dateTime: "2025-08-20 10:00 AM",
    instructions: "Bring your working model.",
    prizeMoney: "₹6,000",
    venue: "Expo Hall",
    image: "https://example.com/expo.jpg"
  },
  {
    name: "Poster Designing",
    teamSize: "1-2 Members",
    entryFee: 100,
    dateTime: "2025-08-20 1:00 PM",
    instructions: "Theme will be given on the spot.",
    prizeMoney: "₹1,000",
    venue: "Art Room",
    image: "https://example.com/poster.jpg"
  }
];

const seedEvents = async () => {
  try {
    await Event.deleteMany();
    await Event.insertMany(events);
    console.log("✅ Events Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();
