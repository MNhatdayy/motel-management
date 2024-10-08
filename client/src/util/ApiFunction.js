import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
  return window.localStorage.getItem("token");
};

export const setAuthToken = (data) => {
  window.localStorage.setItem("token", data);
};

export const request = (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = {
      Authorization: `Bearer ${getAuthToken()}`,
    };
  }

  return axios({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};
