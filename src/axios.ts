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

export default instance;
