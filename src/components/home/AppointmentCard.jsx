import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { getAppointmentsByEmail } from '../../api/appointmentService';
import { getUserByEmail } from '../../api/userService';

const AppointmentCard = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [crafterName, setCrafterName] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          setLoading(true);
          if (!user?.email) return;

          const data = await getAppointmentsByEmail(user.email, 'customer');
          const nextAppointment = data[0] || null;
          setAppointment(nextAppointment);

          if (nextAppointment?.crafterEmail) {
            const crafter = await getUserByEmail(nextAppointment.crafterEmail);
            setCrafterName(crafter?.name || nextAppointment.crafterEmail);
          }
        } catch (err) {
          console.error('Error fetching appointments:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }, [user?.email])
  );

  if (loading) {
    return (
      <View style={[styles.card, styles.center]}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {appointment ? (
        <>
          <Text style={styles.label}>Your Next Appointment</Text>
          <Text style={styles.detail}>Crafter: {crafterName}</Text>
          <Text style={styles.detail}>
            Date: {new Date(appointment.date).toLocaleString()}
          </Text>
        </>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
          <Text style={styles.label}>No upcoming appointments</Text>
          <Text style={styles.bookButton}>Book an Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6a380f',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  bookButton: {
    marginTop: 8,
    fontSize: 16,
    color: '#6a380f',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
