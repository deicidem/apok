import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 10000
});

export function addErrorHandler(fn) {
  instance.interceptors.response.use(response => response,fn);
}

export default instance;