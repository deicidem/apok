import axios from "axios";

const instance = axios.create({
  baseURL: "/api/",
  // baseURL: "http://192.168.1.104/apok_backend_php/public/",
  timeout: 10000,
  withCredentials: true
});

instance.interceptors.response.use(
  request => request,
  error => {
    // check network error
    if(error.response === undefined){
      error.response = { status: 0  }; // add new field networkErr
    }

    return Promise.reject(error);
  }
);

export function addErrorHandler(fn) {
  instance.interceptors.response.use(response => response,fn);
}

export default instance;