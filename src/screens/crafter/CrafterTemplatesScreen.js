import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const dummyTemplates = [
  {id: '1', name: 'Wooden Shelf'},
  {id: '2', name: 'Glass Door'},
  {id: '3', name: 'Wall Paint Design'},
];

const CrafterTemplatesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Templates</Text>
      <FlatList
        data={dummyTemplates}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.templateName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default CrafterTemplatesScreen;

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
  templateName: {
    fontSize: 16,
    color: '#333',
  },
});
