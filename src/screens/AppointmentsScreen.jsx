import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>🧰 Crafters Screen Placeholder</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#6a380f',
  },
});

export default AppointmentsScreen;