
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type AddressData = {
  houseAddress: string;
  area: string;
  city: string;
  phone: string;
};

export default function AddressScreen() {
  const [houseAddress, setHouseAddress] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('Rawalpindi');
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const savedAddress =
        await AsyncStorage.getItem('deliveryAddress');

      if (savedAddress) {
        const address: AddressData =
          JSON.parse(savedAddress);

        setHouseAddress(address.houseAddress || '');
        setArea(address.area || '');
        setCity(address.city || 'Rawalpindi');
        setPhone(address.phone || '');
      }
    } catch (error) {
      console.log('Could not load address:', error);
    }
  };

  const handleSave = async () => {
    setMessage('');

    const addressData: AddressData = {
      houseAddress: houseAddress.trim(),
      area: area.trim(),
      city: city.trim(),
      phone: phone.trim(),
    };

    if (!addressData.houseAddress) {
      setMessage('Please enter your house or street address.');
      return;
    }

    if (!addressData.area) {
      setMessage('Please enter your area or locality.');
      return;
    }

    if (!addressData.city) {
      setMessage('Please enter your city.');
      return;
    }

    if (!addressData.phone) {
      setMessage('Please enter your phone number.');
      return;
    }

    try {
      setSaving(true);

      await AsyncStorage.setItem(
        'deliveryAddress',
        JSON.stringify(addressData)
      );

      setMessage('✓ Address saved successfully!');

      setTimeout(() => {
        router.replace('/profile');
      }, 1000);
    } catch (error) {
      console.log('Save address error:', error);

      setMessage(
        'Could not save the address. Please try again.'
      );
    } finally {
      setSaving(false);
    }
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
            onPress={() => router.replace('/profile')}
            activeOpacity={0.7}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>
            Delivery Address
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationCircle}>
            <Text style={styles.locationIcon}>
              📍
            </Text>
          </View>

          <Text style={styles.locationTitle}>
            Where should we deliver?
          </Text>

          <Text style={styles.locationSubtitle}>
            Enter your delivery details below.
          </Text>
        </View>

        <Text style={styles.label}>
          House / Street Address
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. House 123, Street 5"
          placeholderTextColor="#999"
          value={houseAddress}
          onChangeText={setHouseAddress}
        />

        <Text style={styles.label}>
          Area / Locality
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Satellite Town"
          placeholderTextColor="#999"
          value={area}
          onChangeText={setArea}
        />

        <Text style={styles.label}>
          City
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Rawalpindi"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {message !== '' && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              {message}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Address'}
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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    fontSize: 22,
    fontWeight: '800',
    color: '#222',
  },

  headerSpacer: {
    width: 42,
  },

  locationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  locationCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationIcon: {
    fontSize: 38,
  },

  locationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
    marginTop: 15,
  },

  locationSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 5,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginTop: 5,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#222',
    marginBottom: 18,
  },

  messageBox: {
    backgroundColor: '#FFF1E6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  messageText: {
    color: '#E85D04',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  saveButton: {
    backgroundColor: '#E85D04',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});

