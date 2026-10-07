
import { Stack } from 'expo-router';

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
