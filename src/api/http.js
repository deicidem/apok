import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001/api/",
  timeout: 10000
});

export function addErrorHandler(fn) {
  instance.interceptors.response.use(response => response,fn);
}

export default instance;