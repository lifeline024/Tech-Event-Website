import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: String,
  email: String,
  phone: String,
  referenceId: String,
  course: String,
  amount: String,
  createdAt: {
    type: Date,
    default: Date.now,}
});

export default mongoose.model("Booking", bookingSchema);
