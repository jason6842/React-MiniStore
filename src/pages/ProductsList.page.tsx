import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPaginatedProducts, searchProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Product } from "../types/product.types";
import CategorySelect from "../components/CategoriesSelect";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";

export default function ProductsList() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  // Infinite query
  const {
    data: infiniteData,
    isLoading: isLoadingInfinite,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedProducts();

  const { data: searchResults, isLoading: isLoadingSearch } =
    useFilteredProducts({ query, categoryId });

  const isSearching = query !== "" || categoryId !== 0;
  console.log("search results:", searchResults);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {"  "}
      <CategorySelect
        selectedCategory={categoryId}
        onSelectCategory={setCategoryId}
      />
      {/* if query is not an empty string */}
      {isSearching ? (
        // if query is not an empty string and it is still fetching
        isLoadingSearch ? (
          <p>Searching...</p>
        ) : (
          <div>
            {/* if search results are 0 */}
            {searchResults?.length === 0 && <p>No results found.</p>}
            {/* if query returns valid results */}
            {searchResults?.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        )
      ) : isLoadingInfinite ? (
        <p>Loading products...</p>
      ) : (
        <div>
          {/* if there is data to render from infinite data */}
          {infiniteData?.pages.flat().map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
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
      )}
    </div>
  );
}
