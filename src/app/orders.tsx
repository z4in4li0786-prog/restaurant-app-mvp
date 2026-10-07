
import { router } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useCart } from '../context/CartContext';

export default function OrdersScreen() {
  const { orders } = useCart();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace('/profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            My Orders
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              📦
            </Text>

            <Text style={styles.emptyTitle}>
              No orders yet
            </Text>

            <Text style={styles.emptyText}>
              Your completed orders will appear here.
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
            <Text style={styles.ordersCount}>
              {orders.length}{' '}
              {orders.length === 1
                ? 'Order'
                : 'Orders'}
            </Text>

            {orders.map((order) => (
              <View
                key={order.id}
                style={styles.orderCard}
              >
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.restaurantName}>
                      {order.restaurant}
                    </Text>

                    <Text style={styles.orderId}>
                      {order.id}
                    </Text>
                  </View>

                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {order.items.map((item) => (
                  <View
                    key={item.id}
                    style={styles.itemRow}
                  >
                    <Text style={styles.itemEmoji}>
                      {item.emoji}
                    </Text>

                    <View style={styles.itemInfo}>
                      <Text
                        style={styles.itemName}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>

                      <Text style={styles.itemQuantity}>
                        Qty: {item.quantity}
                      </Text>
                    </View>

                    <Text style={styles.itemPrice}>
                      Rs.{' '}
                      {item.price * item.quantity}
                    </Text>
                  </View>
                ))}

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Payment
                  </Text>

                  <Text style={styles.detailValue}>
                    {order.paymentMethod}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Delivery
                  </Text>

                  <Text style={styles.detailValue}>
                    {order.deliveryTime}
                  </Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>
                    Total
                  </Text>

                  <Text style={styles.totalValue}>
                    Rs. {order.total}
                  </Text>
                </View>
              </View>
            ))}
          </>
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
    marginBottom: 25,
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

  ordersCount: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 12,
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  restaurantName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222222',
  },

  orderId: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },

  statusBadge: {
    backgroundColor: '#FFF1E6',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  statusText: {
    color: '#E85D04',
    fontSize: 11,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 14,
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  itemEmoji: {
    width: 38,
    fontSize: 24,
  },

  itemInfo: {
    flex: 1,
    marginRight: 10,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },

  itemQuantity: {
    fontSize: 11,
    color: '#777777',
    marginTop: 3,
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },

  detailLabel: {
    fontSize: 12,
    color: '#777777',
  },

  detailValue: {
    fontSize: 12,
    color: '#222222',
    fontWeight: '600',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222222',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E85D04',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },

  emptyEmoji: {
    fontSize: 55,
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  emptyText: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 25,
  },

  browseButton: {
    backgroundColor: '#E85D04',
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },

  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
