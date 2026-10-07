
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

import { useAuth } from '../context/AuthContext';

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setMessage('');
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }

    const success = await updateProfile(
      name,
      email,
      phone
    );

    if (success) {
      setMessage('Profile updated successfully.');

      setTimeout(() => {
        router.replace('/profile');
      }, 800);
    } else {
      setError('Could not update your profile.');
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

          <Text style={styles.headerTitle}>
            Edit Profile
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name
                ? name.charAt(0).toUpperCase()
                : '👤'}
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#999999"
          />

          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Phone Number
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#999999"
            keyboardType="phone-pad"
          />

          {error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : null}

          {message ? (
            <Text style={styles.successText}>
              {message}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#E85D04',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#222222',
    backgroundColor: '#FAFAFA',
    marginBottom: 18,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginBottom: 14,
  },

  successText: {
    color: '#2E7D32',
    fontSize: 13,
    marginBottom: 14,
    fontWeight: '600',
  },

  saveButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
