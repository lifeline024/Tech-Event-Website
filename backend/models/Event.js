// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamSize: { type: String, required: true },
  entryFee: { type: Number, required: true },
  dateTime: { type: String, required: true },
  instructions: { type: String, required: true },
  prizeMoney: { type: String, required: true },
  venue: { type: String, required: true },
  image: { type: String, required: true }
});

export default mongoose.model("Event", eventSchema);
