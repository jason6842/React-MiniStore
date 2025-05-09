import axiosInstance from "./axiosInstance";

export const getPaginatedProducts = ({ pageParam = 0 }) => {
    return axiosInstance.get(`/products?offset=${pageParam}&limit=20`)
        .then(res => res.data);
}

export const getProductDetail = (id: number) => {
    return axiosInstance.get(`/products/${id}`).then(res => res.data);
}

export const getCategories = () => {
    return axiosInstance.get("/categories").then((res) => {
        console.log("API RESPONSE", res.data);
        return res.data;
    });
}