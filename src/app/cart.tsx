
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>

        <Text style={styles.emptyTitle}>
          Your Cart is Empty
        </Text>

        <Text style={styles.emptyText}>
          Add some delicious food to get started.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            Browse Restaurants
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
            My Cart
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.restaurantCard}>
          <Text style={styles.restaurantEmoji}>
            🍛
          </Text>

          <View>
            <Text style={styles.restaurantName}>
              Spice Garden
            </Text>

            <Text style={styles.restaurantSubtext}>
              Delivery in 25–35 minutes
            </Text>
          </View>
        </View>

        <View style={styles.itemsContainer}>
          {cartItems.map((item) => (
            <View
              key={item.id}
              style={styles.itemCard}
            >
              <View style={styles.itemEmojiContainer}>
                <Text style={styles.itemEmoji}>
                  {item.emoji}
                </Text>
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                <Text style={styles.itemPrice}>
                  Rs. {item.price}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    removeFromCart(item.id)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    decreaseQuantity(item.id)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.quantityText}>
                    −
                  </Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    increaseQuantity(item.id)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.quantityText}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Order Summary
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal
            </Text>

            <Text style={styles.summaryValue}>
              Rs. {subtotal}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Delivery Fee
            </Text>

            <Text style={styles.summaryValue}>
              Rs. {deliveryFee}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalValue}>
              Rs. {total}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
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

  restaurantCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  restaurantEmoji: {
    fontSize: 38,
    marginRight: 14,
  },

  restaurantName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222222',
  },

  restaurantSubtext: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  itemsContainer: {
    paddingHorizontal: 16,
  },

  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  itemEmojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemEmoji: {
    fontSize: 30,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E85D04',
    marginTop: 5,
  },

  removeText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 6,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    fontSize: 20,
    color: '#E85D04',
    fontWeight: '700',
  },

  quantity: {
    minWidth: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#777777',
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 6,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E85D04',
  },

  checkoutButton: {
    height: 54,
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyEmoji: {
    fontSize: 60,
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
  },

  emptyText: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },

  primaryButton: {
    backgroundColor: '#E85D04',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

