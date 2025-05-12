import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductDetail } from "../api/product";
import { Link } from "react-router-dom";
import { getProfile } from "../api/auth";
import { addToCart, updateCart } from "../api/cart";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { mutate: addToCartMutation } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      localStorage.setItem("cartId", data.id);
      toast.success("Product added to cart");
    },
    onError: () => toast.error("Failed to add to cart"),
  });

  const { mutate: updateCartMutation } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      toast.success("Cart updated"),
        queryClient.invalidateQueries({
          queryKey: ["cart", localStorage.getItem("cartId")],
        });
    },
    onError: () => toast.error("Failed to update cart"),
  });

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ["product", product.id],
      queryFn: () => getProductDetail(product.id),
    });
  };

  const handleAddToCart = () => {
    if (!user) return toast.error("You must be logged in to add to cart");

    const cartId = localStorage.getItem("cartId");

    if (cartId) {
      // Cart already exists, so update cart
      updateCartMutation({
        cartId: Number(cartId),
        products: [{ id: product.id, quantity: 1 }],
      });
    } else {
      // Cart does not exist, so create new cart
      addToCartMutation({
        userId: user.id,
        products: [{ id: product.id, quantity: 1 }],
      });
    }
  };

  return (
    <div onMouseEnter={prefetchProduct}>
      <Link to={`/product/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}
