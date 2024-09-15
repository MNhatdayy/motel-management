import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Tên người dùng phải nhiều hơn 3 ký tự",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (value) => isEmail,
        message: "Tên người dùng phải nhiều hơn 3 ký tự",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 6,
        message: "Số điện thoại phải có nhiều hơn 6 kí tự",
      },
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    }
  })
);
