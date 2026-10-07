
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
    type ReactNode,
} from 'react';

import {
    cartReducer,
    initialCartState,
} from '../reducers/cartReducer';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
};

export type Order = {
  id: string;
  restaurant: string;
  items: CartItem[];
  total: number;
  status: string;
  paymentMethod: string;
  deliveryTime: string;
};

type CartContextType = {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (
    item: Omit<CartItem, 'quantity'>
  ) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  placeOrder: (paymentMethod: string) => string;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

const ORDERS_STORAGE_KEY = 'restaurantGoOrders';

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const savedOrders =
        await AsyncStorage.getItem(
          ORDERS_STORAGE_KEY
        );

      if (savedOrders) {
        const parsedOrders: Order[] =
          JSON.parse(savedOrders);

        setOrders(parsedOrders);
      }
    } catch (error) {
      console.log(
        'Could not load orders:',
        error
      );
    }
  };

  const saveOrders = async (
    updatedOrders: Order[]
  ) => {
    try {
      await AsyncStorage.setItem(
        ORDERS_STORAGE_KEY,
        JSON.stringify(updatedOrders)
      );
    } catch (error) {
      console.log(
        'Could not save orders:',
        error
      );
    }
  };

  const cartItems = cartState.cartItems;

  const addToCart = (
    item: Omit<CartItem, 'quantity'>
  ) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  };

  const increaseQuantity = (id: number) => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: id,
    });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      payload: id,
    });
  };

  const removeFromCart = (id: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id,
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  const placeOrder = (paymentMethod: string) => {
    const subtotal = getTotalPrice();
    const deliveryFee = 99;
    const total = subtotal + deliveryFee;

    const orderId =
      '#RG-' +
      Date.now().toString().slice(-6);

    const newOrder: Order = {
      id: orderId,
      restaurant: 'Spice Garden',
      items: [...cartItems],
      total,
      status: 'Preparing',
      paymentMethod,
      deliveryTime: '25–35 minutes',
    };

    setOrders((currentOrders) => {
      const updatedOrders = [
        newOrder,
        ...currentOrders,
      ];

      saveOrders(updatedOrders);

      return updatedOrders;
    });

    dispatch({
      type: 'CLEAR_CART',
    });

    return orderId;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return context;
}

