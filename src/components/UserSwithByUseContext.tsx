import { useContext, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import {
    defaultUser,
    UserContext,
    type UserProfile,
} from '@/contexts/user-context';

export default function App() {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const setUserName = (name: string) => {
    setUser(previousUser => ({
      ...previousUser,
      name,
    }));
  };

  const logout = () => {
    setUser({
      name: 'Khách',
      email: 'guest@example.com',
      avatar: 'https://i.pravatar.cc/200?img=65',
    });
  };

  return (
    <UserContext.Provider value={{ user, setUserName, logout }}>
      <View style={styles.container}>
        <ProfileScreen />
        <Button title="Đổi tên sang Huy Hoang" onPress={() => setUserName('Huy Hoang')} />
      </View>
    </UserContext.Provider>
  );
}

function ProfileScreen() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('ProfileScreen must be used within UserContext.Provider');
  }

  const {
    user: { name, email, avatar },
    logout,
  } = context;

  return (
    <View style={styles.profileCard}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.title}>Xin chào, {name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Button title="Đăng xuất" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    backgroundColor: '#f5f7fb',
  },
  profileCard: {
    width: '100%',
    maxWidth: 320,
    gap: 12,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
});
