
import type { CartItem } from '../context/CartContext';

export type CartState = {
  cartItems: CartItem[];
};

export type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: Omit<CartItem, 'quantity'>;
    }
  | {
      type: 'INCREASE_QUANTITY';
      payload: number;
    }
  | {
      type: 'DECREASE_QUANTITY';
      payload: number;
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: number;
    }
  | {
      type: 'CLEAR_CART';
    };

export const initialCartState: CartState = {
  cartItems: [],
};

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

