import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Review",
  new Schema({
    roomId: { type: ObjectId, required: true, ref: "Room" },
    userId: { type: ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    created: { type: Date, default: Date.now },
  })
);