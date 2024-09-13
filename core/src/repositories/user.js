import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import User from "../models/User.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  let exitsingUser = await User.findOne({ email }).exec();
  if (exitsingUser) {
    //note encrypt
    let isMatch = await bcrypt.compare(password, exitsingUser.password);
    if (!!isMatch) {
      //token
      let token = jwt.sign(
        {
          data: exitsingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10 days",
        }
      )
      exitsingUser.token = token
      return {
        ...exitsingUser.toObject(),
        password: "******",
        token: token
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};

const register = async ({ email, password, name, phoneNumber, address }) => {
  debugger
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
const getAll = async ({ page, size, searchString }) => {
  print("get all user", OutputType.INFORMATION);
};
export default {
  login,
  register,
  getAll,
};
