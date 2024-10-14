import Booking from "../models/Booking.js";
import Exception from "../exceptions/Exception.js";

const findById = async (bookingId) => {
  return await Booking.findById(bookingId);
};
const listBookings = async ({
  page = 1,
  limit = 5,
  sort = "name",
  order = "asc",
  ...filters
}) => {
  try {
    const sortOrder = order.toLowerCase() === "desc" ? -1 : 1;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const bookings = await Booking.find(filters)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(limitNumber);

    const totalBookings = await Booking.countDocuments(filters);
    const totalPages = Math.ceil(totalBookings / limitNumber);
    const hasPreviousPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;
    return {
      bookings,
      totalBookings,
      totalPages,
      currentPage: pageNumber,
      hasPreviousPage,
      hasNextPage,
    };
  } catch (err) {
    throw new Exception(Exception.CANNOT_GET_USER);
  }
};
export const bookingRepository = {
  findById,
  listBookings,
};
