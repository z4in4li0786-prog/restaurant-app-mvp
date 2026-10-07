
import { router, useLocalSearchParams } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MenuItemCard from '../components/ui/MenuItemCard';
import { useCart } from '../context/CartContext';
import {
    menuItems,
    restaurants,
} from '../data/menu';

export default function RestaurantScreen() {
  const { restaurantId } =
    useLocalSearchParams<{
      restaurantId?: string;
    }>();

  const { addToCart, getTotalItems } = useCart();

  const restaurant =
    restaurants.find(
      (item) => item.id === restaurantId
    ) ?? restaurants[0];

  const restaurantMenu = menuItems.filter(
    (item) =>
      item.restaurantId === restaurant.id
  );

  const cartCount = getTotalItems();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text
            style={styles.headerTitle}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.restaurantHero}>
          <View style={styles.heroImage}>
            <Text style={styles.heroEmoji}>
              {restaurant.emoji}
            </Text>
          </View>

          <Text style={styles.restaurantName}>
            {restaurant.name}
          </Text>

          <Text style={styles.restaurantType}>
            {restaurant.type}
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                ⭐
              </Text>

              <Text style={styles.infoValue}>
                {restaurant.rating}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                🕐
              </Text>

              <Text style={styles.infoValue}>
                {restaurant.deliveryTime}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                🛵
              </Text>

              <Text style={styles.infoValue}>
                {restaurant.deliveryFee}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.menuTitle}>
          Menu
        </Text>

        {restaurantMenu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={() => addToCart(item)}
          />
        ))}
      </ScrollView>

      {cartCount > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => router.push('/cart')}
            activeOpacity={0.8}
          >
            <Text style={styles.cartButtonText}>
              View Cart
            </Text>

            <View style={styles.cartCount}>
              <Text style={styles.cartCountText}>
                {cartCount}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 20,
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
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
    marginHorizontal: 12,
  },

  headerSpacer: {
    width: 44,
  },

  restaurantHero: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 25,
  },

  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  heroEmoji: {
    fontSize: 55,
  },

  restaurantName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
  },

  restaurantType: {
    fontSize: 13,
    color: '#777777',
    marginTop: 6,
    textAlign: 'center',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },

  infoItem: {
    flex: 1,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 16,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '600',
    textAlign: 'center',
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 14,
  },

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },

  viewCartButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: '#E85D04',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cartCount: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 7,
  },

  cartCountText: {
    color: '#E85D04',
    fontSize: 13,
    fontWeight: '800',
  },
});

