
import { router } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { useCart } from '../context/CartContext';

export default function CheckoutScreen() {
  const {
    cartItems,
    getTotalPrice,
    placeOrder,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState('Cash on Delivery');

  const subtotal = getTotalPrice();
  const deliveryFee = 99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      router.replace('/');
      return;
    }

    const orderId = placeOrder(paymentMethod);

    router.replace({
      pathname: '/order-success',
      params: {
        orderId,
      },
    });
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
            onPress={() => router.replace('/cart')}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Checkout
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Delivery Address
          </Text>

          <View style={styles.addressCard}>
            <Text style={styles.addressIcon}>
              📍
            </Text>

            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>
                Home
              </Text>

              <Text style={styles.addressText}>
                Your saved delivery address
              </Text>

              <Text style={styles.addressText}>
                Rawalpindi, Pakistan
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/address')}
              activeOpacity={0.7}
            >
              <Text style={styles.changeText}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payment Method
          </Text>

          <TouchableOpacity
            style={[
              styles.paymentCard,
              paymentMethod === 'Cash on Delivery' &&
                styles.paymentCardSelected,
            ]}
            onPress={() =>
              setPaymentMethod('Cash on Delivery')
            }
            activeOpacity={0.8}
          >
            <View style={styles.radio}>
              {paymentMethod === 'Cash on Delivery' && (
                <View style={styles.radioInner} />
              )}
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>
                Cash on Delivery
              </Text>

              <Text style={styles.paymentSubtext}>
                Pay when your order arrives
              </Text>
            </View>

            <Text style={styles.paymentEmoji}>
              💵
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentCard,
              paymentMethod === 'Card' &&
                styles.paymentCardSelected,
            ]}
            onPress={() =>
              setPaymentMethod('Card')
            }
            activeOpacity={0.8}
          >
            <View style={styles.radio}>
              {paymentMethod === 'Card' && (
                <View style={styles.radioInner} />
              )}
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>
                Card
              </Text>

              <Text style={styles.paymentSubtext}>
                Pay securely by card
              </Text>
            </View>

            <Text style={styles.paymentEmoji}>
              💳
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your Order
          </Text>

          <View style={styles.orderCard}>
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={styles.orderItem}
              >
                <Text style={styles.orderEmoji}>
                  {item.emoji}
                </Text>

                <View style={styles.orderInfo}>
                  <Text style={styles.orderName}>
                    {item.name}
                  </Text>

                  <Text style={styles.orderQuantity}>
                    Qty: {item.quantity}
                  </Text>
                </View>

                <Text style={styles.orderPrice}>
                  Rs. {item.price * item.quantity}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Price Details
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
          style={[
            styles.placeOrderButton,
            cartItems.length === 0 &&
              styles.disabledButton,
          ]}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.placeOrderText}>
            Place Order • Rs. {total}
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

  section: {
    marginTop: 18,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 10,
  },

  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  addressIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  addressInfo: {
    flex: 1,
  },

  addressTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  addressText: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  changeText: {
    color: '#E85D04',
    fontSize: 13,
    fontWeight: '800',
  },

  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  paymentCardSelected: {
    borderColor: '#E85D04',
    borderWidth: 2,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#E85D04',
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  paymentTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  paymentSubtext: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  paymentEmoji: {
    fontSize: 24,
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  orderEmoji: {
    fontSize: 25,
    width: 40,
  },

  orderInfo: {
    flex: 1,
  },

  orderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },

  orderQuantity: {
    fontSize: 12,
    color: '#777777',
    marginTop: 3,
  },

  orderPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#222222',
  },

  summaryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 18,
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

  placeOrderButton: {
    height: 54,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },

  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

