
export type Restaurant = {
  id: string;
  name: string;
  type: string;
  rating: string;
  deliveryTime: string;
  deliveryFee: string;
  emoji: string;
};

export type MenuItem = {
  id: number;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 'spice-garden',
    name: 'Spice Garden',
    type: 'Pakistani • Indian • BBQ',
    rating: '4.8',
    deliveryTime: '25–35 min',
    deliveryFee: 'Rs. 99',
    emoji: '🍛',
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    type: 'Pizza • Italian • Fast Food',
    rating: '4.6',
    deliveryTime: '30–40 min',
    deliveryFee: 'Rs. 79',
    emoji: '🍕',
  },
  {
    id: 'burger-house',
    name: 'Burger House',
    type: 'Burgers • Fast Food • Drinks',
    rating: '4.7',
    deliveryTime: '20–30 min',
    deliveryFee: 'Rs. 69',
    emoji: '🍔',
  },
  {
    id: 'royal-chinese',
    name: 'Royal Chinese',
    type: 'Chinese • Thai • Asian',
    rating: '4.5',
    deliveryTime: '25–35 min',
    deliveryFee: 'Rs. 89',
    emoji: '🥡',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    restaurantId: 'spice-garden',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice with spicy chicken',
    price: 450,
    emoji: '🍛',
  },
  {
    id: 2,
    restaurantId: 'spice-garden',
    name: 'Chicken Karahi',
    description: 'Traditional Pakistani chicken karahi',
    price: 850,
    emoji: '🍗',
  },
  {
    id: 3,
    restaurantId: 'spice-garden',
    name: 'Seekh Kebab',
    description: 'Juicy grilled minced meat kebabs',
    price: 550,
    emoji: '🥙',
  },
  {
    id: 4,
    restaurantId: 'pizza-palace',
    name: 'Chicken Pizza',
    description: 'Cheesy pizza topped with chicken',
    price: 999,
    emoji: '🍕',
  },
  {
    id: 5,
    restaurantId: 'pizza-palace',
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with pepperoni and cheese',
    price: 1099,
    emoji: '🍕',
  },
  {
    id: 6,
    restaurantId: 'burger-house',
    name: 'Classic Beef Burger',
    description: 'Beef patty with cheese and fresh vegetables',
    price: 499,
    emoji: '🍔',
  },
  {
    id: 7,
    restaurantId: 'burger-house',
    name: 'Chicken Burger',
    description: 'Crispy chicken fillet with special sauce',
    price: 449,
    emoji: '🍔',
  },
  {
    id: 8,
    restaurantId: 'royal-chinese',
    name: 'Chicken Chow Mein',
    description: 'Stir-fried noodles with chicken and vegetables',
    price: 550,
    emoji: '🍜',
  },
  {
    id: 9,
    restaurantId: 'royal-chinese',
    name: 'Chicken Fried Rice',
    description: 'Chinese-style fried rice with chicken',
    price: 500,
    emoji: '🍚',
  },
];

