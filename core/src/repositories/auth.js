import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import User from "../models/User.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  try {
    let existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
      g;
      throw new Error("Wrong email or password");
    }
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Wrong email or password");
    }
    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    return {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
      name: existingUser.name,
      token: token,
    };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw new Error("Login failed. Please check your credentials.");
  }
};

const register = async ({ email, password, name, phoneNumber, address }) => {
  debugger;
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.EMAIL_EXITS);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT)
  );
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return {
    ...newUser._doc,
    password: "******",
  };
};

export const authRepository = {
  login,
  register,
};
