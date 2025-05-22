import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useUser } from '../../context/UserContext';
import { addReview } from '../../api/reviewService';

const ContactForm = () => {
  const [message, setMessage] = useState('');

  const { user } = useUser();

  const handleSubmit = () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Please log in first.',
      });
      return;
    }

    addReview({
      email: user.email,
      rating: 5,
      message,
      type: 'SITE', // Hardcoded string instead of enum
    })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Review submitted!',
        });
        setMessage('');
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Submission failed.',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Leave a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Your review..."
        multiline
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Review" onPress={handleSubmit} color="#6a380f" />
    </View>
  );
};

export default ContactForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#6a380f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    height: 120,
    textAlignVertical: 'top',
  },
});
