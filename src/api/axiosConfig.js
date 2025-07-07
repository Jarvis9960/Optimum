import axios from "axios";
import store from "../redux/store"; // Import the Redux store
import { setIsTokenValid, setTermsSigned } from "../redux/actions/authActions"; // Import the action creators

const sendbox = "https://sandboxapi.optimum-method.com/api";
const live = "https://api.optimum-method.com/api";

const axiosInstance = axios.create({
  baseURL: sendbox, // Use sandbox URL as default
});

// Request interceptor to add the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle specific API errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 408) {
        // Dispatch the action for an invalid token
        store.dispatch(setIsTokenValid(false));
      }
      if (error.response.status === 423) {
        // Dispatch the action for terms and conditions
        store.dispatch(setTermsSigned(false));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
