// @ts-nocheck
import axios from "axios";
import { getToken } from "./auth";
import { ToastContainer, toast } from "react-toastify";

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

api.interceptors.response.use(
    function (response) {
        // @ts-ignore
        if (response.data && response.data.message) {
            // @ts-ignore
            toast(response.data.message);
        } else if (response.data && response.data.mensagem) {
            // @ts-ignore
            toast(response.data.mensagem);
        }
        console.log("response :", response);
        // if(response.error) {
        // }
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        toast(error);
        console.log("error :", error);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default api;
