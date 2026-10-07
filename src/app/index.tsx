
import { router } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { restaurants } from '../data/menu';

export default function HomeScreen() {
  const { isFavorite, toggleFavorite } =
    useFavorites();

  const { getTotalItems } = useCart();

  const cartCount = getTotalItems();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello! 👋
            </Text>

            <Text style={styles.title}>
              What are you craving?
            </Text>
          </View>

          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => router.push('/cart')}
            activeOpacity={0.8}
          >
            <Text style={styles.cartIcon}>🛒</Text>

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or food"
            placeholderTextColor="#999999"
          />
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>
              Delicious food,
            </Text>

            <Text style={styles.bannerTitle}>
              delivered to you 🍽️
            </Text>

            <Text style={styles.bannerSubtitle}>
              Order your favorite meals today
            </Text>
          </View>

          <Text style={styles.bannerEmoji}>
            🛵
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Restaurants
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/explore')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>
              See All
            </Text>
          </TouchableOpacity>
        </View>

        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() =>
              router.push({
                pathname: '/restaurant',
                params: {
                  restaurantId: restaurant.id,
                },
              })
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

              <Text
                style={styles.restaurantType}
                numberOfLines={1}
              >
                {restaurant.type}
              </Text>

              <View style={styles.restaurantMeta}>
                <Text style={styles.rating}>
                  ⭐ {restaurant.rating}
                </Text>

                <Text style={styles.metaText}>
                  •
                </Text>

                <Text style={styles.metaText}>
                  {restaurant.deliveryTime}
                </Text>

                <Text style={styles.metaText}>
                  •
                </Text>

                <Text style={styles.metaText}>
                  {restaurant.deliveryFee}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={(event) => {
                event.stopPropagation();

                toggleFavorite(restaurant);
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.favoriteIcon}>
                {isFavorite(restaurant.id)
                  ? '❤️'
                  : '🤍'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  greeting: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 4,
  },

  title: {
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  cartIcon: {
    fontSize: 23,
  },

  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  searchContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222222',
  },

  banner: {
    backgroundColor: '#FFF1E6',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  bannerText: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  bannerSubtitle: {
    fontSize: 12,
    color: '#777777',
    marginTop: 8,
  },

  bannerEmoji: {
    fontSize: 55,
    marginLeft: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E85D04',
  },

  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  restaurantImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  restaurantEmoji: {
    fontSize: 38,
  },

  restaurantInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222222',
  },

  restaurantType: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
  },

  metaText: {
    fontSize: 11,
    color: '#999999',
    marginHorizontal: 4,
  },

  favoriteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  favoriteIcon: {
    fontSize: 20,
  },
});
