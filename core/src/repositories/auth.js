import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js";
import User from "../models/User.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/mailConfig.js";
import { userRepository } from "./user.js";
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
const forgot = async ({ recipientEmail, otp }) => {
  debugger;
  console.log(recipientEmail);
  const mailOptions = {
    from: "nhat23891@gmail.com",
    to: recipientEmail,
    subject: "Xác thực mã OTP của bạn",
    text: `Kính gửi quý khách,

Chúng tôi đã nhận được yêu cầu xác thực tài khoản của bạn. Dưới đây là mã OTP của bạn để hoàn tất quá trình xác thực:

Mã OTP: ${otp}

Lưu ý: Mã OTP này có hiệu lực trong vòng 10 phút. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.

Trân trọng,
Nhóm hỗ trợ HEHE-GROUP`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email đã được gửi!");
  } catch (error) {
    console.error("Có lỗi xảy ra khi gửi email:", error);
  }
};

const saveOtp = async (email, otp, otpExpiration) => {
  try {
    await User.updateOne({ email }, { $set: { otp, otpExpiration } });
  } catch (err) {
    throw new Exception(Exception.USER_NOT_FOUND);
  }
};
const resetPassword = async (email, password) => {
  try {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new Exception(Exception.USER_NOT_FOUND);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );
    const updatedUser = await userRepository.update(user._id, {
      password: hashedPassword,
    });
    return updatedUser;
  } catch (err) {
    throw new Exception(Exception.CANNOT_RESET_PASSWORD);
  }
};
export const authRepository = {
  login,
  register,
  forgot,
  saveOtp,
  resetPassword,
};
