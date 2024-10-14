import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model(
  "Room",
  new Schema({
    id: { type: ObjectId },
    owner_id: { type: ObjectId, required: true, ref: "User" },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    size: { type: Number, required: true },
    available: { type: Boolean, default: true },
    image: { type: String },
  })
);
