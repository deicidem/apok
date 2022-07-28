import axios from "axios";

const instance = axios.create({
  baseURL: "/api/",
  // baseURL: "http://192.168.1.104/apok_backend_php/public/",
  timeout: 10000,
  withCredentials: true
});

export function addErrorHandler(fn) {
  instance.interceptors.response.use(response => response, fn);
}

export default instance;