import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Message",
  new Schema({
    id: { type: ObjectId },
    sender_id: { type: ObjectId, required: true, ref: "User" },
    receive_id: { type: ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
  })
);
