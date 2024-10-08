import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Booking",
  new Schema({
    id: { type: ObjectId },
    roomId: { type: ObjectId, required: true, ref: "Room" },
    userId: { type: ObjectId, required: true, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
  })
);

