import { LoginInput, LoginResponse } from "../types/auth.types";
import axiosInstance from "./axiosInstance"

export const login = async (credentials: LoginInput): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
}

export const getProfile = async () => {
    return await axiosInstance.get("/auth/profile").then((res) => res.data);
}