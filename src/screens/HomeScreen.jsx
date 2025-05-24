import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useUser } from '../context/UserContext';
import GreetingHeader from '../components/home/GreetingHeader';
import AppointmentCard from '../components/home/AppointmentCard';
import RecommendedTemplates from '../components/home/RecommendedTemplatesList';
import CrafterSearch from '../components/home/CrafterSearch';

const HomeScreen = () => {
  const { user } = useUser();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <GreetingHeader />
      </View>

      <View style={styles.section}>
        <AppointmentCard />
      </View>

      <View style={styles.section}>
        <RecommendedTemplates />
      </View>

      <View style={styles.section}>
        <CrafterSearch />
      </View>
    </ScrollView>
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
