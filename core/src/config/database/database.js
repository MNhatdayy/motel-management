import mongoose from "mongoose";
import {print, OutputType} from '../../helpers/print.js'
import Exception from "../../exceptions/Exception.js";
mongoose.set("strictQuery", true);
export default async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("Kết nối database thành công", OutputType.SUCCESS);
    return connection;
    debugger
  } catch (e) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (error.code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_DB_CONNECTION_STRING);
    }
    throw new Exception(Exception.WRONG_DB_NOT_CONNECT);
  }
}
