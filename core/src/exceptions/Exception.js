import { print, OutputType } from "../helpers/print.js";
export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD =
    "Tài khoản hoặc mật khẩu người dùng database không đúng";
  static WRONG_DB_CONNECTION_STRING =
    "Tên server hoặc đường dẫn kết nối bị sai";
  static WRONG_DB_NOT_CONNECT = "Không thể kết nối tới database";
  static EMAIL_EXITS = "Email đã tồn tại";
  static CANNOT_REGISTER_USER = "Không thể đăng ký người dùng";
  static WRONG_EMAIL_OR_PASSWORD = "Sai tài khoản hoặc mật khẩu";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
