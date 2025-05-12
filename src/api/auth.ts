import axiosInstance from "./axiosInstance"

type LoginInput = {
    email: string,
    password: string
}

type LoginResponse = {
    access_token: string,
    refresh_token: string
}

export const login = async (credentials: LoginInput): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}

export const getProfile = () => {
    return axiosInstance.get("/auth/profile").then((res) => res.data);
}