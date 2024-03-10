import axios from "axios";
import { BaseURL } from "../config";

const api = axios.create({
  baseURL: BaseURL,
});

export default api;
