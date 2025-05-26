import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppointmentsScreen = ({ route }) => {
  const crafter = route?.params?.crafter;

  useEffect(() => {
    if (crafter) {
      console.log('Received crafter for booking:', crafter.name);
    }
  }, [crafter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      {crafter && (
        <Text style={styles.subtitle}>Booking with: {crafter.name}</Text>
      )}
    </View>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: '#6a380f',
  },
});
