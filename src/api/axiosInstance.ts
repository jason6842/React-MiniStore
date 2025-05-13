import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_STORE_BASE_URL,
})

// Axios interceptor for bearer tokens
// https://www.linkedin.com/pulse/axios-interceptor-bearer-tokens-richard-bentil
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    Promise.reject(error);
    toast.error(error);
})

// Catch 401 errors, indicative of expired tokens, and initiate the token refresh process
// axiosInstance.interceptors.response.use((response) => 
// response, async (error) => {
//     if (error.response?.status === 401 && !error.config.__isRetryRequest && )
// })

export default axiosInstance;