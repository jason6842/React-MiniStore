import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/product";

export default function Product() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    enabled: true,
  });

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;
  const { title, price, description } = product;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <img src={product.images?.[0]} width="200" />
    </div>
  );
}
