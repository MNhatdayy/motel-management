import { body, param, validationResult } from "express-validator";
import { roomRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import Exception from "../exceptions/Exception.js";

const create = async (req, res) => {
  try {
    const room = await roomRepository.create(req.body);
    res.status(HttpStatusCode.CREATE_OK).json({
      message: "Tạo phòng thành công",
      data: room,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};

const update = async (req, res) => {
  try {
    const roomUpdate = await roomRepository.update(req.params.id, req.body);
    if (!roomUpdate) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Phòng không tồn tại",
      });
    }
    res.status(HttpStatusCode.OK).json({
      message: "Cập nhật thành công",
      data: roomUpdate,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Có lỗi xảy ra trong quá trình cập nhật",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await roomRepository.getById(id);
    if (!room) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin phòng" });
    }
    res.status(HttpStatusCode.OK).json({
      message: "Lấy thông tin thành công",
      data: room,
    });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await roomRepository.deleteRoom(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: err.toString(),
    });
  }
};

const list = async (req, res) => {
  try {
    const roomsData = await roomRepository.listRooms({
      ...req.query,
    });

    res.status(200).json({
      message: "Lấy danh sách phòng thành công",
      data: roomsData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Có lỗi xảy ra khi lấy danh sách phòng",
    });
  }
};

export default {
  create,
  update,
  getById,
  deleteRoom,
  list,
};
