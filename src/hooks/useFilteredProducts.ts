import { useQuery } from "@tanstack/react-query"
import { SearchProductsParam } from "../types/product.types"
import { searchProducts } from "../api/product.api"

export const useFilteredProducts = ({ query, categoryId }: SearchProductsParam) => {
    return useQuery({
        queryKey: ["products", { query, categoryId }],
        queryFn: () => searchProducts(query, categoryId),
        enabled: query !== "" || categoryId != 0,
    })
}