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

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 36) / 2;

const TemplateCard = ({template, liked, onToggleLike}) => {
  return (
    <View style={[styles.card, {width: cardWidth}]}>
      <Image source={{uri: template.mainImage}} style={styles.image} />

      {/* Overlay */}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onToggleLike} style={styles.iconWrapper}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color="#FF4D67"
          />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.name} numberOfLines={1}>
            {template.name}
          </Text>
          <Text style={styles.price}>
            ${template.price?.toFixed(2) || '0.00'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TemplateCard;

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 10,
  },
  iconWrapper: {
    alignItems: 'flex-end',
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  name: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  price: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
