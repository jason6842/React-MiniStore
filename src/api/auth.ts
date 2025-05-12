import axiosInstance from "./axiosInstance"

type LoginInput = {
    email: string,
    password: string
}

type LoginResponse = {
    access_token: string,
    refresh_token: string
}

export const login = (credentials: LoginInput): Promise<LoginResponse> => {
    return axiosInstance.post("/auth/login", credentials);
}