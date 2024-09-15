import { getAuthToken, request, setAuthToken } from "../util/ApiFunction";
import { jwtDecode } from "jwt-decode";

export const login = async function (email, password) {
  const res = await request("POST", "/auth/login", {
    email,
    password,
  });
  if (res.status === 200) {
    setAuthToken(res.data.token);
    return res.data.token;
  } else {
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
    role
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
    const decoded = jwtDecode(token);
    const id = decoded.id;
    const role = decoded.role;
    const username = decoded.sub;

    return { id, role, username };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
export const logout = function () {
	window.sessionStorage.removeItem("token");
};
