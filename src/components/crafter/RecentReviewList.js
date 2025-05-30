import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../../context/UserContext';
import {getReviewsByEmail} from '../../api/reviewService';
import {getUserByEmail} from '../../api/userService';
import BottomSheetModal from '../modals/BottomSheetModal';
import ReviewCard from './ReviewCard';

const RecentReviewList = () => {
  const {user} = useUser();
  const [reviews, setReviews] = useState([]);
  const [reviewers, setReviewers] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        if (!user?.email) return;
        const data = await getReviewsByEmail(user.email);
        setReviews(data.reverse());

        const reviewerData = {};
        for (let review of data) {
          const reviewer = await getUserByEmail(review.email);
          reviewerData[review.email] = reviewer;
        }
        setReviewers(reviewerData);
      } catch (err) {
        console.error('Error loading reviews or users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [user?.email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent Reviews</Text>
        <ActivityIndicator size="small" color="#6a380f" />
      </View>
    );
  }

  const renderReviewCard = review => {
    const reviewer = reviewers[review.email];
    const fullReview = {
      user: {
        name: reviewer?.name || review.email?.split('@')[0],
        avatarUrl: reviewer?.avatarUrl || null,
        role: reviewer?.role || 'Customer',
      },
      rating: review.rating,
      message: review.message,
    };

    return <ReviewCard review={fullReview} key={review._id} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Reviews</Text>

      {reviews.length > 0 ? (
        <>
          <FlatList
            data={reviews.slice(0, 3)}
            horizontal
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => renderReviewCard(item)}
          />
          <View style={styles.centered}>
            <TouchableOpacity
              style={styles.readMoreBtn}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.message}>No reviews yet.</Text>
      )}

      <BottomSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Reviews">
        <ScrollView contentContainerStyle={styles.modalList}>
          {reviews.map(r => (
            <View key={r._id} style={styles.modalCard}>
              {renderReviewCard(r)}
            </View>
          ))}
        </ScrollView>
      </BottomSheetModal>
    </View>
  );
};

export default RecentReviewList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 10,
  },
  centered: {
    alignItems: 'center',
    marginTop: 12,
  },
  readMoreBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#6a380f',
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  modalCard: {
    marginBottom: 12,
    alignItems: 'center',
  },
  modalList: {
    paddingBottom: 60,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
});
