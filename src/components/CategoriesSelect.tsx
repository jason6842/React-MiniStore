import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/product.api";
import { Category, CategorySelectProps } from "../types/category.types";

export default function CategorySelect({selectedCategory, onSelectCategory}: CategorySelectProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    gcTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;
  console.log(data);
  return (
    <>
      <select value={selectedCategory} onChange={(e) => onSelectCategory(Number(e.target.value))}>
        <option value={0}>All Categories</option>
        {data?.map((category: Category) => {
          return <option key={category.id} value={category.id}>{category.name}</option>;
        })}
      </select>
    </>
  );
}
