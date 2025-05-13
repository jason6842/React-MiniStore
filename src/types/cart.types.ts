export type CartType = {
    userId: number,
    products: {
        id: number,
        quantity: number,
    }[];
}

export type UpdateCartType = {
    cartId: number,
    products: {
        id: number,
        quantity: number,
    }[];
}