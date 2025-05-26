import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useUser } from '../context/UserContext';
import {
  getAppointmentsByEmail,
  createAppointment,
  deleteAppointment,
} from '../api/appointmentService';
import { addReview } from '../api/reviewService';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';

const AppointmentsScreen = ({ route }) => {
  const { user } = useUser();
  const crafter = route?.params?.crafter;

  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [disabledDates, setDisabledDates] = useState({});
  const [ratings, setRatings] = useState({});

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const userAppointments = await getAppointmentsByEmail(user.email, 'user');
          const enriched = userAppointments.map(app => ({
            ...app,
            crafterName: app.crafterName || app.crafterEmail,
          }));
          setAppointments(enriched);

          if (crafter) {
            const crafterAppointments = await getAppointmentsByEmail(crafter.email, 'crafter');
            const disabledMap = {};
            crafterAppointments.forEach(app => {
              const date = moment(app.date).utcOffset(180).format('YYYY-MM-DD');
              disabledMap[date] = { disabled: true, disableTouchEvent: true };
            });
            setDisabledDates(disabledMap);
          }
        } catch (err) {
          console.error('Error fetching appointments:', err);
        }
      };

      fetchData();
    }, [user.email, crafter?.email])
  );

  const handleConfirmBooking = async () => {
    if (!selectedDate || !crafter) return;

    try {
      const newApp = await createAppointment({
        userEmail: user.email,
        crafterEmail: crafter.email,
        date: selectedDate,
      });

      setAppointments(prev => [
        ...prev,
        {
          ...newApp,
          crafterName: crafter.name,
        },
      ]);

      setDisabledDates(prev => ({
        ...prev,
        [selectedDate]: { disabled: true, disableTouchEvent: true },
      }));

      setSelectedDate(null);
    } catch (err) {
      console.error('Failed to create appointment:', err);
    }
  };

  const handleCancel = async id => {
    Alert.alert('Cancel Appointment', 'Are you sure you want to cancel this appointment?', [
      { text: 'No' },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await deleteAppointment(id, 'user');
            setAppointments(prev => prev.filter(app => app._id !== id));
          } catch (err) {
            console.error('Failed to cancel appointment:', err);
          }
        },
      },
    ]);
  };

  const handleSubmitReview = async (id, rating, message, crafterEmail) => {
    if (!rating || !message.trim()) {
      Alert.alert('Please provide a rating and a review message.');
      return;
    }

    try {
      await addReview({
        email: user.email,
        rating,
        message,
        type: 'Person',
        to: crafterEmail,
      });

      await deleteAppointment(id, 'user');

      setAppointments(prev => prev.filter(app => app._id !== id));
    } catch (err) {
      console.error('Failed to submit review and delete appointment:', err);
      Alert.alert('Error', 'Something went wrong while submitting the review.');
    }
  };

  const renderAppointment = ({ item }) => {
    const showCancel = item.status !== 'confirmed' && item.status !== 'completed';
    const showReview = item.status === 'completed';

    return (
      <View style={styles.card}>
        {showCancel && (
          <TouchableOpacity
            style={styles.cancelIcon}
            onPress={() => handleCancel(item._id || item.id)}
          >
            <Ionicons name="close-circle" size={20} color="red" />
          </TouchableOpacity>
        )}

        <Text style={styles.date}>
          {moment(item.date).utcOffset(180).format('MMMM D, YYYY')}
        </Text>

        <Text style={styles.status}>
          Status:{' '}
          <Text style={[styles.statusText, getStatusStyle(item.status)]}>
            {item.status}
          </Text>
        </Text>

        <Text style={styles.crafter}>Booked By: {item.crafterName}</Text>

        {showReview && (
          <View style={{ marginTop: 10 }}>
            <StarRating
              rating={ratings[item._id]?.stars || 0}
              onChange={stars =>
                setRatings(prev => ({
                  ...prev,
                  [item._id]: { ...prev[item._id], stars },
                }))
              }
              starSize={24}
              color="#6a380f"
            />
            <TextInput
              placeholder="Write your review..."
              value={ratings[item._id]?.text || ''}
              onChangeText={text =>
                setRatings(prev => ({
                  ...prev,
                  [item._id]: { ...prev[item._id], text },
                }))
              }
              multiline
              style={{
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginVertical: 8,
                backgroundColor: '#fff',
              }}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() =>
                handleSubmitReview(
                  item._id,
                  ratings[item._id]?.stars || 0,
                  ratings[item._id]?.text || '',
                  item.crafterEmail
                )
              }
            >
              <Text style={styles.confirmText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const getStatusStyle = status => {
    if (status === 'pending') return { color: '#FF9800' };
    if (status === 'confirmed') return { color: '#2196F3' };
    if (status === 'completed') return { color: 'green' };
    if (status === 'disabled') return { color: '#888' };
    return { color: 'black' };
  };

  return (
    <View style={styles.container}>
      {crafter && (
        <>
          <Text style={styles.title}>Book {crafter.name}</Text>
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
            markedDates={{
              ...disabledDates,
              ...(selectedDate && {
                [selectedDate]: { selected: true, selectedColor: '#6a380f' },
              }),
            }}
            minDate={moment().utcOffset(180).format('YYYY-MM-DD')}
            theme={{
              selectedDayBackgroundColor: '#6a380f',
              todayTextColor: '#6a380f',
            }}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
            <Text style={styles.confirmText}>Confirm Booking</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.subheading}>Your Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item, index) => item._id || item.id || index.toString()}
        renderItem={renderAppointment}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef9f4',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#6a380f',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff7f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    elevation: 2,
  },
  cancelIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    marginBottom: 4,
  },
  statusText: {
    fontWeight: 'bold',
  },
  crafter: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
