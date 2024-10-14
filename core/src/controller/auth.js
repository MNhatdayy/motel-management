import { body, param, validationResult } from "express-validator";

import { userRepository, authRepository } from "../repositories/index.js";

import HttpStatusCode from "../exceptions/HttpStatusCode.js";

import { EventEmitter } from "node:events";

import Exception from "../exceptions/Exception.js";
import { send } from "node:process";
import bcrypt, { compare } from "bcrypt";
import { log } from "node:console";
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
const forgot = async (req, res) => {
  try {
    const recipientEmail = req.body.email;
    console.log(recipientEmail);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = Date.now() + 3 * 60 * 1000;
    await authRepository.saveOtp(recipientEmail, otp, otpExpiration);
    await authRepository.forgot({ recipientEmail, otp });
    res.status(HttpStatusCode.OK).json({
      message: "OTP đã được gửi tới email của bạn",
      data: res.data,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    console.log(email, otp, newPassword);

    const user = await userRepository.getByEmail(email);
    if (user.otp !== otp || Date.now() > user.otpExpiration) {
      res.status(HttpStatusCode.OK).json({
        message: "OTP không hợp lệ hoặc hết hạn",
      });
    }
    await authRepository.resetPassword(email, newPassword);
    res.status(HttpStatusCode.OK).json({
      message: "Cập nhật mật khẩu thành công",
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi cập nhật mật khẩu",
    });
  }
};
export default {
  login,
  register,
  forgot,
  resetPassword,
};
