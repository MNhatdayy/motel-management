import { print, OutputType } from "../helpers/print.js";
export default class Exception extends Error {
  //Exception Error Database
  static WRONG_DB_USERNAME_PASSWORD =
    "Tài khoản hoặc mật khẩu người dùng database không đúng";
  static WRONG_DB_CONNECTION_STRING =
    "Tên server hoặc đường dẫn kết nối bị sai";
  static WRONG_DB_NOT_CONNECT = "Không thể kết nối tới database";

  //Exception Error Auth
  static EMAIL_EXITS = "Email đã tồn tại";
  static CANNOT_REGISTER_USER = "Không thể đăng ký người dùng";
  static WRONG_EMAIL_OR_PASSWORD = "Sai tài khoản hoặc mật khẩu";
  //Exception user
  static USER_EXITS = "người dùng không tồn tại";

  //Exception room
  static ROOM_EXITS = "phòng không tồn tại";

  //Exception Booking
  static BOOKING_EXITS = "phòng đã tồn tại";
  static BOOKING_NOTFOUND = "Không tìm thấy phòng";
  static BOOKING_LIST = "Lỗi khi lấy danh sách tin nhắn";

  // Exception Message
  static MESSAGE_USER_NOT_FOUND = "Người gửi không tồn tại.";
  static MESSAGE_RECEIVER_NOT_FOUND = "Người nhận không tồn tại.";
  static MESSAGE_SENDER_RECEIVER_SAME =
    "Người gửi và người nhận không được trùng nhau.";
  static MESSAGE_NOT_FOUND = "Không tìm thấy tin nhắn.";
  static MESSAGE_CREATE_ERROR = "Lỗi khi tạo tin nhắn.";
  static MESSAGE_UPDATE_ERROR = "Lỗi khi cập nhật tin nhắn.";
  static MESSAGE_DELETE_ERROR = "Lỗi khi xóa tin nhắn.";

  // Exception Review
  static REVIEW_NOT_FOUND = "Không tìm thấy đánh giá.";
  static REVIEW_NOT_FOUND_LIST = "không tìm thấy danh sách";
  static CREATE_REVIEW_ERROR = "Lỗi khi tạo đánh giá.";
  static UPDATE_REVIEW_ERROR = "Lỗi khi cập nhật đánh giá.";
  static DELETE_REVIEW_ERROR = "Lỗi khi xóa đánh giá.";

  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
