import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gate-pass-system-iitbbs.herokuapp.com/api/v1",
  withCredentials: true,
  timeout: 3000,
});

export default axiosInstance;
