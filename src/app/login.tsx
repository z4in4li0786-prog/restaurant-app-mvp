
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    const success = await login(email, password);

    if (success) {
      router.replace('/');
    } else {
      setError('Login failed. Please check your details.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍽️</Text>
          </View>

          <Text style={styles.logoText}>
            RestaurantGo
          </Text>

          <Text style={styles.subtitle}>
            Welcome back!
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.forgotButton}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/signup')}
            activeOpacity={0.7}
          >
            <Text style={styles.signupLink}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  content: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 50,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  backText: {
    fontSize: 34,
    color: '#222222',
    lineHeight: 38,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 35,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  logoEmoji: {
    fontSize: 40,
  },

  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222222',
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    marginTop: 6,
  },

  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#222222',
    backgroundColor: '#FAFAFA',
    marginBottom: 18,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginTop: -6,
    marginBottom: 12,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  forgotText: {
    color: '#E85D04',
    fontSize: 13,
    fontWeight: '700',
  },

  loginButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  signupText: {
    color: '#777777',
    fontSize: 14,
  },

  signupLink: {
    color: '#E85D04',
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 5,
  },
});

