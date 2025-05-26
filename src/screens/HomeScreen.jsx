import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useUser } from '../context/UserContext';
import GreetingHeader from '../components/home/GreetingHeader';
import AppointmentCard from '../components/home/AppointmentCard';
import RecommendedTemplates from '../components/home/RecommendedTemplatesList';
import CrafterSearch from '../components/home/CrafterSearch';

const HomeScreen = () => {
  const { user } = useUser();

  const sections = [
    { key: 'greeting', component: <GreetingHeader /> },
    { key: 'appointment', component: <AppointmentCard /> },
    { key: 'recommended', component: <RecommendedTemplates /> },
    { key: 'craftersearch', component: <CrafterSearch /> },
  ];

  return (
    <FlatList
      data={sections}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <View style={styles.section}>{item.component}</View>}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#f7e9d7',
  },
  section: {
    marginBottom: 20,
  },
});
