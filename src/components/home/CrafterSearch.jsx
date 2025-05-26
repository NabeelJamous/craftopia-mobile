import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../context/UserContext';
import { fetchUsers } from '../../api/userService';
import { getReviewsByEmail } from '../../api/reviewService';
import OptionPickerModal from '../modals/OptionPickerModal';
import BottomSheetModal from '../modals/BottomSheetModal';
import StatCard from '../reviews/StatCard';
import ReviewCard from '../reviews/ReviewCard';
import UserAvatar from '../UserAvatar/UserAvatar'; // ✅ using your avatar component
import CrafterCard from './CrafterCard'; // adjust path if needed


const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 2;

const hardcodedCrafts = [
  'Plasterer',
  'Plumber',
  'Electrician',
  'Painter',
  'Tiler',
  'Carpenter',
  'Aluminum and Glass Technician',
  'Cleaner',
];

const CrafterSearch = () => {
  const { user } = useUser();
  const [query, setQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('');
  const [sortByRating, setSortByRating] = useState(null);
  const [users, setUsers] = useState([]);
  const [showCraftModal, setShowCraftModal] = useState(false);
  const [selectedCrafter, setSelectedCrafter] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const animatedValues = useRef([]);

  const loadUsers = async () => {
    const data = await fetchUsers({
      query,
      selectedCraft,
      sortByRating,
      location: user.location,
      maxDistance: 5,
    });
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, [query, selectedCraft, sortByRating]);

  useEffect(() => {
    if (reviews.length === 0) return;
    animatedValues.current = reviews.map(() => new Animated.Value(0));
    reviews.forEach((_, index) => {
      Animated.timing(animatedValues.current[index], {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, [reviews]);

  const handleReset = () => {
    setQuery('');
    setSelectedCraft('');
    setSortByRating(null);
    loadUsers();
  };

  const toggleRatingSort = () => {
    setSortByRating(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleOpenReviews = async crafter => {
    setSelectedCrafter(crafter);
    try {
      const data = await getReviewsByEmail(crafter.email);
      setReviews(data);
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
    setShowReviews(true);
  };

const renderCrafter = ({ item }) => (
  <CrafterCard crafter={item} onPress={() => handleOpenReviews(item)} />
);

  const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
  const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;

  return (
    <View style={styles.wrapper}>
      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Search by name or tag..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleReset}>
          <Ionicons name="close-circle" size={20} color="#6a380f" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Explore Crafters</Text>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowCraftModal(true)}>
          <Ionicons name="hammer-outline" size={16} color="#6a380f" />
          <Text style={styles.filterText}>{selectedCraft || 'Craft'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn} onPress={toggleRatingSort}>
          <Ionicons name="star-outline" size={16} color="#6a380f" />
          <Text style={styles.filterText}>
            Rating {sortByRating === 'asc' ? '↑' : sortByRating === 'desc' ? '↓' : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="location-outline" size={16} color="#6a380f" />
          <Text style={styles.filterText}>Location</Text>
        </TouchableOpacity>
      </View>

      {/* Crafter Cards */}
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={item => item._id}
          renderItem={renderCrafter}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      ) : (
        <Text style={styles.empty}>No crafters found 🕵️‍♂️</Text>
      )}

      {/* Craft Dropdown Modal */}
      <OptionPickerModal
        visible={showCraftModal}
        title="Select a Craft"
        options={hardcodedCrafts}
        onSelect={craft => setSelectedCraft(craft)}
        onClose={() => setShowCraftModal(false)}
      />

      {/* Review Bottom Sheet */}
      <BottomSheetModal
        visible={showReviews}
        onClose={() => setShowReviews(false)}
        title="Reviews"
        height="80%"
      >
        <Text style={styles.reviewTitle}>Reviews</Text>

        <View style={styles.statsRow}>
          <StatCard icon="😊" count={positiveCount} bgColor="#6a380f" />
          <StatCard icon="🙁" count={negativeCount} bgColor="#a94438" />
        </View>

        <FlatList
          data={reviews}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: animatedValues.current[index] || new Animated.Value(1),
                transform: [
                  {
                    translateY: animatedValues.current[index]
                      ? animatedValues.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        })
                      : 0,
                  },
                ],
                marginBottom: 16,
              }}
            >
              <ReviewCard review={item} />
            </Animated.View>
          )}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </BottomSheetModal>
    </View>
  );
};

export default CrafterSearch;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginTop: 24,
    flex: 1,
    backgroundColor: '#f7e9d7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4e3c1',
    borderWidth: 1,
    borderColor: '#6a380f',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6a380f',
    fontWeight: '500',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#888',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});
