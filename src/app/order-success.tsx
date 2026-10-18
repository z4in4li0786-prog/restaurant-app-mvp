
import { router, useLocalSearchParams } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function OrderSuccessScreen() {
  const { orderId } = useLocalSearchParams<{
    orderId?: string;
  }>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>
          Order Placed!
        </Text>

        <Text style={styles.subtitle}>
          Your order has been received and is now
          being prepared.
        </Text>

        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>
            Order Number
          </Text>

          <Text style={styles.orderId}>
            {orderId || '#RG-000000'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🍛</Text>

            <View>
              <Text style={styles.restaurantName}>
                Spice Garden
              </Text>

              <Text style={styles.deliveryText}>
                Estimated delivery
              </Text>

              <Text style={styles.deliveryTime}>
                25–35 minutes
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.messageIcon}>
            🚴
          </Text>

          <Text style={styles.messageText}>
            We'll let you know when your order is
            on its way.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace('/orders')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            Track My Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            Back to Home
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },

  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  checkmark: {
    fontSize: 52,
    fontWeight: '800',
    color: '#2E7D32',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222222',
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 320,
  },

  orderCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  orderLabel: {
    fontSize: 12,
    color: '#777777',
    textAlign: 'center',
  },

  orderId: {
    fontSize: 22,
    fontWeight: '800',
    color: '#E85D04',
    textAlign: 'center',
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 18,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 38,
    marginRight: 14,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222222',
  },

  deliveryText: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  deliveryTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E85D04',
    marginTop: 2,
  },

  messageBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E6',
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },

  messageIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  messageText: {
    flex: 1,
    fontSize: 12,
    color: '#555555',
    lineHeight: 18,
  },

  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  secondaryButtonText: {
    color: '#E85D04',
    fontSize: 15,
    fontWeight: '700',
  },
});

