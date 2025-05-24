import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUser} from '../context/UserContext'; // ✅ Make sure this is imported

const ProfileScreen = () => {
  const {user} = useUser(); // ✅ Make sure you call this hook inside the component

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      <Text style={styles.info}>Name: {user?.name || 'N/A'}</Text>
      <Text style={styles.info}>Email: {user?.email || 'N/A'}</Text>
      <Text style={styles.info}>Role: {user?.role || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 12},
  info: {fontSize: 16, marginBottom: 6},
});

export default ProfileScreen;
