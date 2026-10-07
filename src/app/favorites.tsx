import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen() {
  const {
    favorites,
    toggleFavorite,
  } = useFavorites();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>
              Favorites
            </Text>

            <Text style={styles.subtitle}>
              Your favorite restaurants
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {favorites.length === 0 ? (
          /* Empty State */
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>
              ❤️
            </Text>

            <Text style={styles.emptyTitle}>
              No Favorites Yet
            </Text>

            <Text style={styles.emptyText}>
              Tap the heart on a restaurant to save it
              here for later.
            </Text>

            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.replace('/')}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>
                Browse Restaurants
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {favorites.map((restaurant) => (
              <View
                key={restaurant.id}
                style={styles.restaurantCard}
              >
                <TouchableOpacity
                  style={styles.restaurantMain}
                  onPress={() =>
                    router.push('/restaurant')
                  }
                  activeOpacity={0.85}
                >
                  <View style={styles.restaurantImage}>
                    <Text style={styles.restaurantEmoji}>
                      {restaurant.emoji}
                    </Text>
                  </View>

                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>
                      {restaurant.name}
                    </Text>

                    <Text style={styles.restaurantType}>
                      {restaurant.type}
                    </Text>

                    <View
                      style={styles.restaurantDetails}
                    >
                      <Text style={styles.rating}>
                        ⭐ {restaurant.rating}
                      </Text>

                      <Text style={styles.delivery}>
                        • {restaurant.deliveryTime}
                      </Text>
                    </View>

                    <Text style={styles.deliveryFee}>
                      {restaurant.deliveryFee}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() =>
                    toggleFavorite(restaurant)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.favoriteIcon}>
                    ❤️
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.replace('/')}
              activeOpacity={0.8}
            >
              <Text style={styles.browseButtonText}>
                Browse More Restaurants
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>🏠</Text>

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.replace('/favorites')}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>❤️</Text>

          <Text style={styles.navTextActive}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
          activeOpacity={0.8}
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/orders')}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>📦</Text>

          <Text style={styles.navText}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Text style={styles.navIcon}>👤</Text>

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  content: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: '#333',
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#222',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
    textAlign: 'center',
  },

  headerSpacer: {
    width: 42,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 35,
    alignItems: 'center',
    marginTop: 25,
  },

  emptyEmoji: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#222',
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 22,
  },

  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  restaurantMain: {
    flex: 1,
    flexDirection: 'row',
  },

  restaurantImage: {
    width: 82,
    height: 82,
    borderRadius: 14,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  restaurantEmoji: {
    fontSize: 40,
  },

  restaurantInfo: {
    flex: 1,
    paddingLeft: 13,
    justifyContent: 'center',
  },

  restaurantName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222',
  },

  restaurantType: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },

  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555',
  },

  delivery: {
    fontSize: 11,
    color: '#888',
    marginLeft: 5,
  },

  deliveryFee: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },

  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  favoriteIcon: {
    fontSize: 21,
  },

  browseButton: {
    backgroundColor: '#E85D04',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 5,
  },

  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 75,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
  },

  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  navText: {
    fontSize: 10,
    color: '#888',
    fontWeight: '600',
  },

  navTextActive: {
    fontSize: 10,
    color: '#E85D04',
    fontWeight: '800',
  },

  cartButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
  },

  cartIcon: {
    fontSize: 25,
  },
});