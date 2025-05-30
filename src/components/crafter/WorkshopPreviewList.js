import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const dummyWorkshops = [
  {id: '1', title: 'Kitchen Renovation', progress: 75, status: 'In Progress'},
  {id: '2', title: 'Window Repair', progress: 100, status: 'Completed'},
];

const WorkshopPreviewList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workshops</Text>
      <FlatList
        horizontal
        data={dummyWorkshops}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Ionicons
              name={
                item.status === 'Completed'
                  ? 'checkmark-done-outline'
                  : 'construct-outline'
              }
              size={24}
              color="#6a380f"
              style={{marginBottom: 8}}
            />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.progress}>Progress: {item.progress}%</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default WorkshopPreviewList;

const styles = StyleSheet.create({
  container: {paddingLeft: 20, marginTop: 20},
  title: {fontSize: 18, fontWeight: 'bold', color: '#6a380f', marginBottom: 10},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {fontWeight: 'bold', fontSize: 14, marginBottom: 4, color: '#333'},
  progress: {fontSize: 13, color: '#555'},
  status: {fontSize: 13, color: '#888'},
});
