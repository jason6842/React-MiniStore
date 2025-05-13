import { useInfiniteQuery } from "@tanstack/react-query";
import { getPaginatedProducts } from "../api/product.api";

export const usePaginatedProducts = () => {
    return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getPaginatedProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < 20 ? undefined : pages.length * 20;
    },
  });
}