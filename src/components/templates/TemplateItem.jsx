import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TemplateItem = ({ template }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: template.mainImage }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {template.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    padding: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

export default TemplateItem;
