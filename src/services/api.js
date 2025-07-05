import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7290/api", // ✅ Your API base
});

export default api;