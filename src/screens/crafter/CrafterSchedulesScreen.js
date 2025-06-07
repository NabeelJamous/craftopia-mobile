import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {useUser} from '../../context/UserContext';
import {
  getAppointmentsByEmail,
  getDisabledDates,
  createAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from '../../api/appointmentService';
import {CANCELLATION_REASONS} from '../../constants/cancellationReasons';
import messageService from '../../api/messageService';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BlurView} from '@react-native-community/blur';

const CrafterSchedulesScreen = () => {
  const {user} = useUser();
  const [markedDates, setMarkedDates] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [focusedId, setFocusedId] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadData = async () => {
    try {
      const [apps, disabled] = await Promise.all([
        getAppointmentsByEmail(user.email, 'crafter'),
        getDisabledDates(user.email),
      ]);

      const appointmentMap = {};
      apps.forEach(a => {
        const d = moment(a.date).utcOffset(180).format('YYYY-MM-DD');
        appointmentMap[d] = {disabled: true, disableTouchEvent: true};
      });

      const disabledMap = {};
      disabled.forEach(d => {
        disabledMap[d] = {disabled: true, disableTouchEvent: true};
      });

      const sorted = [
        ...apps.filter(a => a.status !== 'completed'),
        ...apps.filter(a => a.status === 'completed'),
      ];

      setAppointments(sorted);
      setMarkedDates({...appointmentMap, ...disabledMap});
    } catch (err) {
      Toast.show({type: 'error', text1: 'Failed to load data'});
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.email) loadData();
    }, [user?.email]),
  );

  const handleDateToggle = async date => {
    if (markedDates[date]) {
      Toast.show({type: 'info', text1: `${date} is already disabled.`});
      return;
    }

    try {
      await createAppointment({
        userEmail: 'system',
        crafterEmail: user.email,
        date,
      });
      Toast.show({type: 'success', text1: `Disabled ${date}`});
      await loadData();
    } catch (err) {
      Toast.show({type: 'error', text1: 'Failed to disable date'});
    }
  };

  const handleCancelRequest = app => {
    const isDisabled = app.userEmail === 'system';
    const isCompleted = app.status === 'completed';

    if (isDisabled || isCompleted) {
      deleteAppointment(app._id, 'crafter')
        .then(() => {
          Toast.show({type: 'success', text1: 'Deleted successfully.'});
          setAppointments(prev => prev.filter(a => a._id !== app._id));
          clearFocus();
        })
        .catch(() => {
          Toast.show({type: 'error', text1: 'Failed to delete.'});
        });
    } else {
      setAppointmentToCancel(app);
      setShowReasonModal(true);
    }
  };

  const confirmCancellation = async () => {
    if (!appointmentToCancel || !selectedReason) return;

    try {
      await deleteAppointment(appointmentToCancel._id, 'crafter');

      await messageService.sendMessage({
        sender: user.email,
        receiver: appointmentToCancel.userEmail,
        content: `Your appointment on ${moment(appointmentToCancel.date).format(
          'MMMM D, YYYY',
        )} was canceled by the crafter. Reason: ${selectedReason}.`,
      });

      Toast.show({type: 'success', text1: 'Appointment canceled.'});
      setAppointments(prev =>
        prev.filter(a => a._id !== appointmentToCancel._id),
      );
      clearFocus();
    } catch (err) {
      Toast.show({type: 'error', text1: 'Failed to cancel appointment.'});
    }
  };

  const handleFocus = id => {
    setFocusedId(id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const clearFocus = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setFocusedId(null);
    });
  };

  const getStatusColor = status => {
    if (status === 'pending') return '#FFA500';
    if (status === 'confirmed') return '#2196F3';
    if (status === 'completed') return '#4CAF50';
    return '#888';
  };

  const renderAppointment = ({item}) => {
    const isDisabled = item.userEmail === 'system';
    const isFocused = focusedId === item._id;

    const handleStatusChange = async status => {
      try {
        await updateAppointmentStatus(item._id, status);
        Toast.show({type: 'success', text1: `Marked as ${status}`});
        await loadData();
      } catch (err) {
        Toast.show({type: 'error', text1: 'Failed to update status'});
      }
    };

    return (
      <Pressable onLongPress={() => handleFocus(item._id)}>
        <View style={[styles.card, isFocused && styles.focusedCard]}>
          <Text style={styles.date}>
            {moment(item.date).utcOffset(180).format('MMMM D, YYYY')}
          </Text>
          <Text style={[styles.text, {color: getStatusColor(item.status)}]}>
            Status: {item.status}
          </Text>

          {!isDisabled && (
            <>
              <Text style={styles.text}>Customer: {item.userEmail}</Text>
              <View style={styles.iconRow}>
                {item.status === 'pending' && (
                  <TouchableOpacity
                    onPress={() => handleStatusChange('confirmed')}>
                    <Ionicons name="checkmark-circle" size={24} color="blue" />
                  </TouchableOpacity>
                )}
                {item.status === 'confirmed' && (
                  <TouchableOpacity
                    onPress={() => handleStatusChange('completed')}>
                    <FontAwesome5 name="check-double" size={20} color="green" />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}

          {isFocused && (
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => handleCancelRequest(item)}>
              <Ionicons name="close-circle" size={28} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Availability</Text>

      <Calendar
        onDayPress={day => handleDateToggle(day.dateString)}
        markedDates={markedDates}
        minDate={moment().utcOffset(180).format('YYYY-MM-DD')}
        theme={{
          todayTextColor: '#6a380f',
          selectedDayBackgroundColor: '#6a380f',
        }}
      />

      <Text style={styles.subheading}>Appointments</Text>

      {focusedId && (
        <Pressable
          onPress={clearFocus}
          style={[StyleSheet.absoluteFill, {zIndex: 1}]}>
          <Animated.View style={[StyleSheet.absoluteFill, {opacity: fadeAnim}]}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          </Animated.View>
        </Pressable>
      )}

      <FlatList
        data={appointments}
        keyExtractor={item => item._id}
        renderItem={renderAppointment}
        contentContainerStyle={{paddingBottom: 100}}
        style={{zIndex: 2}}
      />

      {/* Modal for cancellation reason */}
      <Modal
        visible={showReasonModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowReasonModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select cancellation reason:</Text>
            {CANCELLATION_REASONS.map(reason => (
              <TouchableOpacity
                key={reason}
                style={styles.reasonOption}
                onPress={() => setSelectedReason(reason)}>
                <Text
                  style={[
                    styles.reasonText,
                    selectedReason === reason && {
                      fontWeight: 'bold',
                      color: '#6a380f',
                    },
                  ]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            ))}
            <View style={{marginTop: 16}}>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  !selectedReason && {backgroundColor: '#ccc'},
                ]}
                onPress={confirmCancellation}
                disabled={!selectedReason}>
                <Text style={styles.confirmText}>Confirm Cancel</Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => setShowReasonModal(false)}
                style={{marginTop: 10}}>
                <Text style={{textAlign: 'center', color: '#999'}}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

export default CrafterSchedulesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
    color: '#6a380f',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    position: 'relative',
  },
  focusedCard: {
    transform: [{scale: 1.02}],
    borderColor: '#6a380f',
    borderWidth: 1.5,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  reasonOption: {
    paddingVertical: 8,
  },
  reasonText: {
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#6a380f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
