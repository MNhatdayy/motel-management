import { getAuthToken, request, setAuthToken } from "../util/ApiFunction";
import { jwtDecode } from "jwt-decode";

export const login = async function (email, password) {
  try {
    const res = await request("POST", "/auth/login", {
      email,
      password,
    });
    if (res.status === 200) {
      setAuthToken(res.data.data.token);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};
export const register = async function (
  name,
  email,
  password,
  phoneNumber,
  address
) {
  const role = "USER";
  const res = await request("POST", "auth/register", {
    name,
    email,
    password,
    phoneNumber,
    address,
    role,
  });
  if (res.status === 200) {
    return res.data.token;
  } else {
    return null;
  }
};
export const parseToken = () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("No token found");
      return null;
    }

    const decoded = jwtDecode(token);
    const { id, role, name } = decoded;

    return { id, role, name };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const logout = function () {
  window.sessionStorage.removeItem("token");
};
