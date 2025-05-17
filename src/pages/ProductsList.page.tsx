import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPaginatedProducts, searchProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Product } from "../types/product.types";
import CategorySelect from "../components/CategoriesSelect";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import useDebounce from "../hooks/useDebounce";
import { Input } from "@/components/ui/input";

export default function ProductsList() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const debouncedQuery = useDebounce(query, 500);

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
    useFilteredProducts({ query: debouncedQuery, categoryId });

  const isSearching = query !== "" || categoryId !== 0;
  console.log("search results:", searchResults);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border-gray-700"
      />
      {"  "}
      <CategorySelect
        selectedCategory={categoryId}
        onSelectCategory={setCategoryId}
      />
      {/* if query is not an empty string */}
      {isSearching && query !== debouncedQuery && <p>Searching...</p>}
      {/* Conditional rendering for search and infinite products */}
      {isSearching ? (
        isLoadingSearch ? (
          <p>Loading results...</p>
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
