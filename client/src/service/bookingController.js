import axios from "axios";

// Fetch all bookings with optional pagination, sorting, and filtering
export const fetchBookings = async ({
  page = 1,
  limit = 5,
  sort,
  order,
} = {}) => {
  const params = {
    page,
    limit,
    sort,
    order,
  };
  const res = await axios.get("/bookings", { params });
  return res.data;
};

// Create a new booking
export const createBooking = async (newBooking) => {
  const res = await axios.post("/bookings/create", newBooking, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// Update an existing booking by ID
export const updateBooking = async (id, updatedBooking) => {
  const res = await axios.put(`/bookings/update/${id}`, updatedBooking, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// Get a booking by ID
export const getBookingById = async (id) => {
  const res = await axios.get(`/bookings/${id}`);
  return res.data;
};

// Delete a booking by ID
export const deleteBooking = async (id) => {
  const res = await axios.delete(`/bookings/delete/${id}`);
  return res.data;
};