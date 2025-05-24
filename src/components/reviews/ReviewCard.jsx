import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReviewCard = ({ review }) => {
  const { user, message, rating } = review;
  const name = user?.name || 'Anonymous';
  const role = user?.role || 'Customer';
  const avatar = user?.avatarUrl;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.avatarText}>{name.charAt(0)}</Text>
          </View>
        )}
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.stars}>
          {Array.from({ length: rating }).map((_, i) => (
            <Ionicons key={i} name="star" size={16} color="#f7b500" />
          ))}
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdf5ec',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6a380f',
  },
  right: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    color: '#6a380f',
    fontSize: 15,
  },
  role: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  stars: {
    flexDirection: 'row',
  },
});
