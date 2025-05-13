import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../api/product.api";

export const useProduct = (numericId: number | undefined) => {
    return useQuery({
    queryKey: ["product", numericId],
    queryFn: () => getProductDetail(numericId!),
    enabled: !!numericId,
  });
}