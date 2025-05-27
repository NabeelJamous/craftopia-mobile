import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CrafterHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Crafter 👋</Text>
      <Text style={styles.subtitle}>
        Manage your templates, appointments, and workshops.
      </Text>
    </View>
  );
};

export default CrafterHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});
