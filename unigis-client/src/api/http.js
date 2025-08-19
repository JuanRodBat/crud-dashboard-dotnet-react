import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE || "https://localhost:5001/api";

export const http = axios.create({
  baseURL,
  timeout: 15000,
});
