import axios from "axios";
import { BASE_URL } from "./constant";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export default axiosClient;
