import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategories } from "../api/product";

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    gcTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;
  console.log(data);
  return (
    <ul>
      {data?.map((category) => {
        return <li key={category.id}>{category.name}</li>;
      })}
    </ul>
  );
}
