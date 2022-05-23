import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/apok_backend_php/public/",
  timeout: 10000,
  withCredentials: true
});

// instance.interceptors.request.use(
//   config => {
//       const token = localStorage.getItem('access_token');
//       console.log();
//       if (token) {
//           config.headers['Authorization'] = 'Bearer ' + token;
//       }
//       config.headers['Content-Type'] = 'application/json';
//       return config;
//   },
//   error => {
//       Promise.reject(error)
// });

export function addErrorHandler(fn) {
  instance.interceptors.response.use(response => response,fn);
}

export default instance;