import Exception from "../exceptions/Exception.js";
import Room from "../models/Room.js";
const create = async (data) => {
  try {
    const room = await Room.create({
      owner_id: data.owner_id,
      address: data.address,
      price: data.price,
      description: data.description,
      size: data.size,
      available: data.available,
    });
    return {
      ...room._doc,
    };
  } catch (err) {
    throw new Exception(Exception.CANNOT_CREATE_ROOM);
  }
};

const update = async (id, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Exception(Exception.NO_DATA_FOR_UPDATE);
  }
  try {
    const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });
    if (!updatedRoom) {
      throw new Exception(Exception.ROOM_NOT_FOUND);
    }
    return updatedRoom;
  } catch (err) {
    throw new Exception(Exception.CANNOT_UPDATE_ROOM, err);
  }
};

const deleteRoom = async (id) => {
  try {
    return await Room.findByIdAndDelete(id);
  } catch (err) {
    throw new Exception(Exception.CANNOT_DELETE_ROOM);
  }
};

const getById = async (id) => {
  try {
    const room = await Room.findById(id);
    return room.toObject();
  } catch (err) {
    throw new Exception(Exception.CANNOT_GET_ROOM);
  }
};
const listRooms = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "asc",
  ...filters
}) => {
  try {
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const rooms = await Room.find(filters)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limitNumber);
    const totalRooms = await Room.countDocuments(filters);
    const totalPages = Math.ceil(totalRooms / limitNumber);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;
    return {
      rooms,
      totalRooms,
      totalPages,
      currentPage: pageNumber,
      hasPreviousPage,
      hasNextPage,
    };
  } catch (err) {
    throw new Exception(Exception.CANNOT_GET_ROOM);
  }
};

export const roomRepository = {
  create,
  listRooms,
  deleteRoom,
  getById,
  update,
};
