import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const dummyAppointments = [
  {id: 'a1', date: '2025-06-01', customer: 'Alice'},
  {id: 'a2', date: '2025-06-02', customer: 'Bob'},
];

const CrafterSchedulesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Schedules</Text>
      <FlatList
        data={dummyAppointments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.info}>Date: {item.date}</Text>
            <Text style={styles.info}>Customer: {item.customer}</Text>
          </View>
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default CrafterSchedulesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6a380f',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  info: {
    fontSize: 16,
    color: '#444',
  },
});
