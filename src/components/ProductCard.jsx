import { useQueryClient } from "@tanstack/react-query";
import { getProductDetail } from "../api/product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const queryClient = useQueryClient();

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => getProductDetail(product.id),
    });
  };
  return (
    <Link to={`/product/${product.id}`}>
      <div onMouseEnter={prefetchProduct}>
        <h3>{product.title}</h3>
      </div>
    </Link>
  );
}
