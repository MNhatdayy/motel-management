import axios from "axios";

export const fetchUsers = async ({
  page = 1,
  limit = 5,
  sort = "name",
  order = "asc",
  active = true,
}) => {
  try {
    const response = await axios.get("/users", {
      params: {
        page,
        limit,
        sort,
        order,
        active,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching users");
  }
};

export const createUser = async (newUser) => {
  const res = await axios.post(`/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return res.json();
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`/users/update/${id}`, updatedUser, {
      headers: { "Content-Type": "application/json" },
    });

    // Kiểm tra xem phản hồi có dữ liệu hay không
    if (response.status === 200) {
      return response.data; // Trả về dữ liệu từ phản hồi
    } else {
      throw new Error("Cập nhật không thành công"); // Nếu không phải 200, ném lỗi
    }
  } catch (error) {
    // Xử lý lỗi từ server hoặc mạng
    throw error.response
      ? error.response.data.message || "Có lỗi xảy ra trong quá trình cập nhật"
      : error.message || "Có lỗi xảy ra trong quá trình cập nhật";
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/users/delete/${id}`);
    return res.data; // Trả về dữ liệu từ response
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
export const getUserById = async (id) => {
  try {
    const res = await axios.get(`/users/${id}`);
    if (res.status === 200) {
      return res.data.data; // Return the user data from the response
    } else {
      throw new Error(res.data.message || "Error fetching user data");
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || "An error occurred");
  }
};
