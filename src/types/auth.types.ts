export type LoginInput = {
    email: string,
    password: string
}

export type LoginResponse = {
    access_token: string,
    refresh_token: string
}