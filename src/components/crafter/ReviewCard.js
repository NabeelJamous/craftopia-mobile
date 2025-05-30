import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReviewCard = ({review}) => {
  const {user, message, rating} = review;
  const name = user?.name || 'Anonymous';
  const role = user?.role || 'Customer';
  const avatar = user?.avatarUrl;

  return (
    <View style={styles.card}>
      {avatar ? (
        <Image source={{uri: avatar}} style={styles.avatar} />
      ) : (
        <View style={styles.placeholderAvatar}>
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        </View>
      )}

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>

      <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
        {message}
      </Text>

      <View style={styles.stars}>
        {Array.from({length: rating}).map((_, i) => (
          <Ionicons key={i} name="star" size={16} color="#f7b500" />
        ))}
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: 180,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginBottom: 8,
  },
  placeholderAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6a380f',
  },
  name: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 14,
    textAlign: 'center',
  },
  role: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
