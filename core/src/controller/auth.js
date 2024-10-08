import { body, param, validationResult } from "express-validator";

import { authRepository } from "../repositories/index.js";

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
    let existingUser = await authRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Đăng nhập thành công",
      data: existingUser,
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
    debugger;
    let user = await authRepository.register({
      email,
      password,
      name,
      phoneNumber,
      address,
      role: role || "USER",
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
