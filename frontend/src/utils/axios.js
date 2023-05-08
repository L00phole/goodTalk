
import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";

const api = axios.create();

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default api;