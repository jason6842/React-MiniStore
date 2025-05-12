import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteCart, getCart, updateCart } from "../api/cart";
import { toast } from "react-toastify";

export default function CartPage() {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState<number | null>(() => {
    const storedId = localStorage.getItem("cartId");
    return storedId ? Number(storedId) : null;
  });

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId,
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
    onError: () => {
      toast.error("Failed to update cart");
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      toast.success("Cart deleted");
      localStorage.removeItem("cartId");
      setCartId(null);
    },
    onError: () => {
      toast.error("Failed to delete cart");
    },
  });

  if (!cartId) return <p>No cart Id found. Add an item to start a cart.</p>;

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>Failed to load cart.</h2>;

  return (
    <div>
      <h2>Your Cart (${cart.id})</h2>
      <ul>
        {cart.products.map((product) => {
          return (
            <li key={product.id}>
              Qty: {product.quantity}
              <button
                onClick={() =>
                  updateMutation({
                    cartId: cart.id,
                    products: [
                      { id: product.id, quantity: product.quantity + 1 },
                    ],
                  })
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  updateMutation({
                    cartId: cart.id,
                    products: [
                      {
                        id: product.id,
                        quantity: Math.max(1, product.quantity - 1),
                      },
                    ],
                  })
                }
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => deleteMutation(cart.id)}>Delete Cart</button>
    </div>
  );
}
