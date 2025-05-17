import { Product } from "../types/product.types";
import axiosInstance from "./axiosInstance";

export const getPaginatedProducts = async ({ pageParam = 0 }) => {
    const response = await axiosInstance.get(`/products?offset=${pageParam}&limit=20`);
    return response.data;
}

export const searchProducts = async (query: string, categoryId: number): Promise<Product[]> => {
    const response = await axiosInstance.get(`/products`, {
        params: {
            title: query || undefined,
            categoryId: categoryId !== 0 ? categoryId : undefined,
        }
    });
    return response.data;
}

export const getProductDetail = async (id: number) => {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data;
}

export const getCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
}

export const getSuggestions = async (query: string, limit=5): Promise<Product[]> => {
    const response = await axiosInstance.get(`/products`, {
        params: {
            title: query || undefined,
            offset: 0,
            limit: limit,
        }
    });
    return response.data;
}