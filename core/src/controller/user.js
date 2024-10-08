import { body, param, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

import { EventEmitter } from "node:events";

import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter();

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.getById(id);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.deleteUser(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};
const update = async (req, res) => {
  try {
    const userUpdate = await userRepository.update(req.params.id, req.body);
    if (!userUpdate) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Phòng không tồn tại",
      });
    }
    res.status(HttpStatusCode.OK).json({
      message: "Cập nhật thành công",
      data: userUpdate,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Có lỗi xảy ra trong quá trình cập nhật",
    });
  }
};
const list = async (req, res) => {
  try {
    const usersData = await userRepository.list({ ...req.query });
    res.status(200).json({
      message: "Lấy danh sách phòng thành công",
      data: usersData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export default {
  getById,
  deleteUser,
  update,
  list,
};
