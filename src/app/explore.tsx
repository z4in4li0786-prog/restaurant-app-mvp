
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

import { useFavorites } from '../context/FavoritesContext';
import { restaurants } from '../data/menu';

export default function ExploreScreen() {
  const { isFavorite, toggleFavorite } =
    useFavorites();

  const [search, setSearch] = useState('');

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      restaurant.type
        .toLowerCase()
        .includes(search.toLowerCase())
  );

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
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Explore
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants"
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <Text style={styles.sectionTitle}>
          All Restaurants
        </Text>

        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              🔍
            </Text>

            <Text style={styles.emptyTitle}>
              No restaurants found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for something else.
            </Text>
          </View>
        ) : (
          filteredRestaurants.map((restaurant) => (
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

                <View style={styles.metaRow}>
                  <Text style={styles.rating}>
                    ⭐ {restaurant.rating}
                  </Text>

                  <Text style={styles.dot}>
                    •
                  </Text>

                  <Text style={styles.metaText}>
                    {restaurant.deliveryTime}
                  </Text>
                </View>

                <Text style={styles.deliveryFee}>
                  Delivery: {restaurant.deliveryFee}
                </Text>
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
          ))
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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    fontSize: 34,
    color: '#222222',
    lineHeight: 38,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222222',
  },

  headerSpacer: {
    width: 44,
  },

  searchContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 25,
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

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 14,
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

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
  },

  dot: {
    fontSize: 11,
    color: '#999999',
    marginHorizontal: 5,
  },

  metaText: {
    fontSize: 11,
    color: '#777777',
  },

  deliveryFee: {
    fontSize: 11,
    color: '#999999',
    marginTop: 5,
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

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 70,
  },

  emptyEmoji: {
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  emptyText: {
    fontSize: 13,
    color: '#777777',
    marginTop: 6,
  },
});
