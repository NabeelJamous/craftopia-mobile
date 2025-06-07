import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// List of features
const features = [
  {
    icon: 'user-shield',
    title: 'Trusted Professionals',
    description: 'Every crafter is verified and rated.',
  },
  {
    icon: 'comments',
    title: 'Seamless Communication',
    description: 'Chat and plan projects seamlessly.',
  },
  {
    icon: 'tools',
    title: 'Skilled Across Industries',
    description: 'Experts from multiple fields.',
  },
  {
    icon: 'map-marker-alt',
    title: 'Local & Nearby',
    description: 'Find trusted crafters near you.',
  },
];

const Features = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.icon}>
        <FontAwesome5 name={item.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Why Craftopia?</Text>
      <FlatList
        data={features}
        numColumns={2}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a380f',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 15,
  },
  card: {
    flex: 1,
    backgroundColor: '#f7e9d7',
    margin: 8,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: '#6a380f',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a380f',
    textAlign: 'center',
    marginBottom: 5,
  },
  desc: {
    fontSize: 13,
    textAlign: 'center',
    color: '#6a380f',
  },
});
