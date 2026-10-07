
import { useCart as useCartContext } from '../context/CartContext';

export function useCart() {
  const cart = useCartContext();

  const itemCount = cart.getTotalItems();
  const totalPrice = cart.getTotalPrice();

  return {
    ...cart,
    itemCount,
    totalPrice,
    isEmpty: cart.cartItems.length === 0,
  };
}

