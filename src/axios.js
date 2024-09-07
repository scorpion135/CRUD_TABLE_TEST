import axios from "axios";

const instance = axios.create({
  baseURL: "https://test.v5.pryaniky.com",
  headers: {
    "x-auth": `${
      window.localStorage.getItem("token")
        ? window.localStorage.getItem("token")
        : ""
    }`,
  },
});

// instance.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem("token");
//   if (token) {
//     config.headers.common["x-auth"] = token;
//   }
//   return config;
// });

export default instance;
