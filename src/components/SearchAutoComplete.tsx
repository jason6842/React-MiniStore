import { getProductDetail, getSuggestions } from "@/api/product.api";
import useDebounce from "@/hooks/useDebounce";
import { Product } from "@/types/product.types";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function SearchAutoComplete() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false); // display dropdown
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null); // highlight-line
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch suggestions when query changes and set it to results
  useEffect(() => {
    if (!debouncedQuery) return setResults([]);

    console.log("SUGGESTIONS", getSuggestions(debouncedQuery));

    getSuggestions(debouncedQuery).then((data) => {
      setResults(data);
      setActiveIndex(-1);
    });
  }, [debouncedQuery]);

  console.log("RESULTSSSS", results);

  const prefetchProduct = (product: Product) => {
    console.log("PREFETCH", product.id);
    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => getProductDetail(product.id),
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false); // close dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return; // keys don't do anything
    console.log(e.key, activeIndex);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < results.length) {
          navigate(`/product/${results[activeIndex].id}`);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={ref}>
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true); // opens when typing
        }}
        // when the input already has a value and is clicked or tabbed into
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow">
          {results.map((product, index) => {
            return (
              <li
                key={product.id}
                className={`cursor-pointer px-4 py-2 hover:bg-purple-300 ${
                  index === activeIndex
                    ? "bg-purple-300 font-medium"
                    : "hover:bg-purple-100"
                }`}
                onClick={() => navigate(`/product/${product.id}`)}
                onMouseEnter={() => prefetchProduct(product)}
              >
                {product.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchAutoComplete;
