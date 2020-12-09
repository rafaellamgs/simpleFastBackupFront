import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "http://192.168.255.253:5000/api/v1/simple-fast-backup",
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    console.log("token :", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.common["x-access-token"] = token;
    }
    return config;
});

export default api;
