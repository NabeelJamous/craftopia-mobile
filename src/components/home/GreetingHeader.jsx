import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';

const GreetingHeader = () => {
  const { user } = useUser();

  const name = user?.name || 'Guest';
  const avatarUrl = user?.avatarUrl;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>Hi {name}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => console.log('Notifications clicked')}>
        <View style={styles.notificationIconWrapper}>
          <Ionicons name="notifications-outline" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GreetingHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    marginLeft: 10,
  },
  greeting: {
    fontSize: 18,
    color: '#444',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a380f',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6a380f',
  },
  notificationIconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 24,
    backgroundColor: '#6a380f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
