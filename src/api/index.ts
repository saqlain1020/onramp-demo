import axios from "axios";
import { BaseURL } from "../config";

const api = axios.create({
  baseURL: BaseURL,
});

export default api;

api.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return {
      status: true,
      data: response.data,
    };
  },
  (error) => {
    return {
      status: false,
      message: error.response?.data?.message || error.message || error || "Something went wrong",
      cause: error,
    };
  }
);
