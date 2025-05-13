import { Category } from "./category.types"

export type Product = {
    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    category: Category,
    images: string[],
    creationAt: string,
    updatedAt: string,
}

export type SearchProductsParam = {
    query: string,
    categoryId: number,
}