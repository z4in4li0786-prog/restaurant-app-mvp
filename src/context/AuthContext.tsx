
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  updateProfile: (
    name: string,
    email: string,
    phone: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

const USER_STORAGE_KEY = 'restaurantGoUser';

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser =
        await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (savedUser) {
        const parsedUser: User = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.log('Could not load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    const loggedInUser: User = {
      id: 'user-1',
      name: 'Demo User',
      email: email.trim(),
      phone: '',
    };

    try {
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return true;
    } catch (error) {
      console.log('Login error:', error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: '',
    };

    try {
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(newUser)
      );

      setUser(newUser);

      return true;
    } catch (error) {
      console.log('Signup error:', error);
      return false;
    }
  };

  const updateProfile = async (
    name: string,
    email: string,
    phone: string
  ): Promise<boolean> => {
    if (!name.trim() || !email.trim()) {
      return false;
    }

    if (!user) {
      return false;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    try {
      await AsyncStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      return true;
    } catch (error) {
      console.log('Profile update error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}
