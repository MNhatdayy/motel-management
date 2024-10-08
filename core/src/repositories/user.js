import Exception from "../exceptions/Exception.js";
import User from "../models/User.js";
const update = async (id, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw new Exception(Exception.NO_DATA_FOR_UPDATE);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      throw new Exception(Exception.USER_NOT_FOUND);
    }
    return updatedUser;
  } catch (err) {
    throw new Exception(Exception.CANNOT_UPDATE_USER, err);
  }
};
const list = async ({
  page = 1,
  limit = 5,
  sort = "name",
  order = "asc",
  ...filters
}) => {
  try {
    debugger;
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const users = await User.find(filters)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limitNumber);
    const totalUsers = await User.countDocuments(filters);
    const totalPages = Math.ceil(totalUsers / limitNumber);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;
    return {
      users,
      totalUsers,
      totalPages,
      currentPage: pageNumber,
      hasPreviousPage,
      hasNextPage,
    };
  } catch (err) {
    throw new Exception(Exception.CANNOT_GET_USER);
  }
};
const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    throw new Exception();
  }
};
const getById = async (id) => {
  try {
    debugger;
    const user = await User.findById(id);
    return user.toObject();
  } catch (err) {
    throw new Exception(Exception.CANNOT_GET_USER);
  }
};
export const userRepository = {
  update,
  list,
  deleteUser,
  getById,
};
