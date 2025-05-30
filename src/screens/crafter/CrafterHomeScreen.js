import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import GreetingHeader from '../../components/home/GreetingHeader';
import CrafterAppointmentCard from '../../components/crafter/CrafterAppointmentCard';
import WorkshopPreviewList from '../../components/crafter/WorkshopPreviewList';
import RecentReviewList from '../../components/crafter/RecentReviewList';

const CrafterHomeScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <GreetingHeader />
      <CrafterAppointmentCard />
      <RecentReviewList />
      <WorkshopPreviewList />
    </ScrollView>
  );
};

export default CrafterHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
  },
  content: {
    paddingBottom: 100,
  },
});
