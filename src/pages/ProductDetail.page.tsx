import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/product.api";
import { useProduct } from "../hooks/useProduct";

export default function Product() {
  const { id } = useParams();
  const numericId = id ? Number(id) : undefined;
  const { data: product, isLoading, isError, error } = useProduct(numericId);

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
