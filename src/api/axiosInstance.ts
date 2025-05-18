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
axiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
        const originalRequest = error.config;
        console.log("CONFIG", error.response);
        if (error.response?.status === 401 && error.response?.data?.message === "TOKEN_EXPIRED" && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite retries
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                console.log("refresh token", refreshToken);

                toast.info("Refreshing access token...", { autoClose: 1000 })
                // Make a request to your auth server to refresh the token.
                const response = await axiosInstance.post('/auth/refresh-token', { refreshToken });
                console.log("RESPONSE: ", response);

                const { access_token, refresh_token: newRefreshToken } = response.data;

                // Store the new access and refresh tokens
                localStorage.setItem("token", access_token);
                localStorage.setItem("refresh_token", newRefreshToken);

                // Update the authorization header with the new access token.
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
                console.error("Token refresh failed", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");

                toast.error("Session expired. Please login again.");

                // Redirect to login page

                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is
    })

export default axiosInstance;