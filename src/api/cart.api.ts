import { CartType, UpdateCartType } from "../types/cart.types";
import axiosInstance from "./axiosInstance";

export const getCart = (cartId: number) => {
    return axiosInstance.get(`/carts/${cartId}`).then(res => res.data);
}

export const addToCart = async (cart: CartType) => {
    return await axiosInstance.post("/carts/add", cart).then(res => res.data);
}

export const updateCart = async (updatedCart: UpdateCartType) => {
    const { cartId, products } = updatedCart;
    return await axiosInstance.put(`/carts/${cartId}`, { products }).then(res => res.data);
}

export const deleteCart = (cartId: number) => {
    return axiosInstance.delete(`/carts/${cartId}`).then(res => res.data);
}