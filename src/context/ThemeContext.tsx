
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] =
    useState<ThemeMode>('light');

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light'
        ? 'dark'
        : 'light'
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme must be used inside ThemeProvider'
    );
  }

  return context;
}

