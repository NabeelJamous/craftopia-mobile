import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 36) / 2;

const CrafterCard = ({crafter}) => {
  const navigation = useNavigation();
  const hasImage = !!crafter.avatarUrl;

  const handleBookPress = () => {
    navigation.navigate('Appointments', {crafter}); // 👈 Pass crafter to Appointments tab
  };

  const handleChatPress = () => {
    console.log('Chat with:', crafter.name);
  };

  return (
    <TouchableOpacity style={[styles.card, {width: cardWidth}]}>
      {hasImage ? (
        <Image source={{uri: crafter.avatarUrl}} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initial}>
            {crafter.name?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
      )}

      {/* Top-right icons */}
      <View style={styles.topRightIcons}>
        <TouchableOpacity onPress={handleChatPress} style={styles.iconButton}>
          <Ionicons name="chatbubble-outline" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBookPress} style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <View style={styles.infoCard}>
          <Text style={styles.name}>{crafter.name}</Text>
          <Text style={styles.craft}>{crafter.craft}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {crafter.rating?.toFixed(1) || '0.0'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CrafterCard;

const styles = StyleSheet.create({
  card: {
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d3c0ae',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  topRightIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    padding: 6,
    marginLeft: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 10,
  },
  infoCard: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  craft: {
    color: '#ddd',
    fontSize: 13,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});
