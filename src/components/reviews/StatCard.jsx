// src/components/reviews/StatCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ icon, count, bgColor }) => (
  <View style={[styles.card, { backgroundColor: bgColor }]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.count}>{count}</Text>
  </View>
);

export default StatCard;

const styles = StyleSheet.create({
  card: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  count: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
