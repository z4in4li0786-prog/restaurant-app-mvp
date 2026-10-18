
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/')}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Profile
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : '👤'}
            </Text>
          </View>

          <Text style={styles.name}>
            {isLoggedIn
              ? user?.name
              : 'Welcome to RestaurantGo'}
          </Text>

          <Text style={styles.email}>
            {isLoggedIn
              ? user?.email
              : 'Login to manage your account'}
          </Text>
        </View>

        {!isLoggedIn ? (
          <View style={styles.authCard}>
            <Text style={styles.authTitle}>
              Welcome!
            </Text>

            <Text style={styles.authText}>
              Login or create an account to manage
              your profile and orders.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push('/login')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/signup')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/edit-profile')}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>👤</Text>

              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>
                  Edit Profile
                </Text>

                <Text style={styles.menuSubtitle}>
                  Update your personal information
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/address')}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>📍</Text>

              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>
                  Delivery Address
                </Text>

                <Text style={styles.menuSubtitle}>
                  Manage your delivery address
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/orders')}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>📦</Text>

              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>
                  My Orders
                </Text>

                <Text style={styles.menuSubtitle}>
                  View your order history
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>🚪</Text>

              <View style={styles.menuInfo}>
                <Text style={styles.logoutTitle}>
                  Logout
                </Text>

                <Text style={styles.menuSubtitle}>
                  Sign out of your account
                </Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 40,
  },

  header: {
    height: 64,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    fontSize: 32,
    color: '#E85D04',
    lineHeight: 34,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  headerSpacer: {
    width: 42,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E85D04',
  },

  name: {
    fontSize: 21,
    fontWeight: '800',
    color: '#222222',
  },

  email: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },

  authCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  authTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  authText: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 18,
  },

  primaryButton: {
    height: 50,
    borderRadius: 13,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  secondaryButton: {
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  secondaryButtonText: {
    color: '#E85D04',
    fontSize: 15,
    fontWeight: '800',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },

  menuItem: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  menuIcon: {
    fontSize: 24,
    width: 42,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 4,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },

  logoutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D32F2F',
  },

  menuSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },

  arrow: {
    fontSize: 27,
    color: '#AAAAAA',
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 62,
  },
});

