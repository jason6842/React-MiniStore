import axiosInstance from "./axiosInstance";

type CartType = {
    userId: number,
    products: {
        id: number,
        quantity: number,
    }[];
}

type UpdateCartType = {
    cartId: number,
    products: {
        id: number,
        quantity: number,
    }[];
}

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