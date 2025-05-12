import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getPaginatedProducts } from "../api/product";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getPaginatedProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length < 20 ? undefined : pages.length * 20;
    },
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  console.log(data?.pages);

  return (
    <div>
      {data?.pages.flat().map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          Load More
        </button>
      )}
    </div>
  );
}
