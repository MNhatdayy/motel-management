import { body, param, validationResult } from "express-validator";

import { userRepository } from "../repositories/index.js";

import HttpStatusCode from "../exceptions/HttpStatusCode.js";

import { EventEmitter } from "node:events";

import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter();

const login = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    debugger
    let exstingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Đăng nhập thành công",
      data: exstingUser,
    });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: e.toString(),
    });
  }
};
const register = async (req, res) => {
  const { email, password, name, phoneNumber, address, role } = req.body;
  try {
    debugger
    let user = await userRepository.register({
      email,
      password,
      name,
      phoneNumber,
      address,
      role : role || 'USER',
    });
    res.status(HttpStatusCode.CREATE_OK).json({
      message: "Đăng ký thành công",
      data: user,
    });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: e.toString(),
    });
  }
};
export default {
  login,
  register,
};
