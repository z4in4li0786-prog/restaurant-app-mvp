
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type FavoriteRestaurant = {
  id: string;
  name: string;
  type: string;
  rating: string;
  deliveryTime: string;
  deliveryFee: string;
  emoji: string;
};

type FavoritesContextType = {
  favorites: FavoriteRestaurant[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (
    restaurant: FavoriteRestaurant
  ) => void;
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

const FAVORITES_STORAGE_KEY = 'restaurantGoFavorites';

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<
    FavoriteRestaurant[]
  >([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites =
        await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY
        );

      if (savedFavorites) {
        const parsedFavorites: FavoriteRestaurant[] =
          JSON.parse(savedFavorites);

        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.log(
        'Could not load favorites:',
        error
      );
    }
  };

  const saveFavorites = async (
    updatedFavorites: FavoriteRestaurant[]
  ) => {
    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.log(
        'Could not save favorites:',
        error
      );
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(
      (restaurant) => restaurant.id === id
    );
  };

  const toggleFavorite = (
    restaurant: FavoriteRestaurant
  ) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite =
        currentFavorites.some(
          (item) => item.id === restaurant.id
        );

      const updatedFavorites = alreadyFavorite
        ? currentFavorites.filter(
            (item) => item.id !== restaurant.id
          )
        : [...currentFavorites, restaurant];

      saveFavorites(updatedFavorites);

      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return context;
}

