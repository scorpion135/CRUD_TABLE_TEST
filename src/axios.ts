import axios from "axios";

const instance = axios.create({
  baseURL: "https://test.v5.pryaniky.com",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-auth"] = token;
  }

  return config;
});

export default instance;
