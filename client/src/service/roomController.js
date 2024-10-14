import axios from "axios";

export const fetchRooms = async ({
  page = 1,
  limit = 5,
  sort,
  order,
  active = true,
} = {}) => {
  const params = {
    page,
    limit,
    sort,
    order,
    active,
  };
  const res = await axios.get("/rooms", { params });
  return res.data;
};

export const createRoom = async (newRoom) => {
  const res = await axios.post("/rooms/create", newRoom, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateRoom = async (id, updatedRoom) => {
  const res = await axios.put(`/rooms/update/${id}`, updatedRoom, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getRoomById = async (id) => {
  const res = await axios.get(`/rooms/${id}`);
  return res.data;
};

export const deleteRoom = async (id) => {
  const res = await axios.delete(`/rooms/delete/${id}`);
  return res.data;
};
