import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  participantName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true },
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Registration", registrationSchema);
