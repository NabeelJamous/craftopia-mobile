// TemplateCard.js (Scale + Fade Others + Blur-Aware + Animated Delete)

import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {deleteTemplate} from '../../../api/templateService';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 36) / 2;

const TemplateCard = ({
  template,
  onPress,
  onDeleted,
  isFocused,
  hasFocus,
  onFocusChange,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const deleteAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isFocused ? 1.05 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: hasFocus && !isFocused ? 0.3 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, hasFocus]);

  const handleDelete = async () => {
    try {
      Animated.timing(deleteAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(async () => {
        await deleteTemplate(template._id);
        Toast.show({
          type: 'success',
          text1: 'Deleted',
          text2: `${template.name} removed.`,
        });
        if (onDeleted) onDeleted();
        if (onFocusChange) onFocusChange(null); // Remove blur after delete
      });
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Delete failed',
        text2: 'Could not delete template.',
      });
    }
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          width: cardWidth,
          transform: [{scale: scaleAnim}],
          opacity: Animated.multiply(fadeAnim, deleteAnim),
        },
      ]}>
      <TouchableOpacity
        onLongPress={() => onFocusChange(template._id)}
        onPress={onPress}
        activeOpacity={0.9}>
        <Image source={{uri: template.mainImage}} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.infoBox}>
            <Text style={styles.name} numberOfLines={1}>
              {template.name}
            </Text>
            <Text style={styles.price}>
              ${template.price?.toFixed(2) || '0.00'}
            </Text>
            <View style={styles.likesContainer}>
              <Ionicons name="heart" size={16} color="#FF4D67" />
              <Text style={styles.likeCount}>{template.likes || 0}</Text>
            </View>
          </View>
        </View>
        {isFocused && (
          <TouchableOpacity style={styles.deleteIcon} onPress={handleDelete}>
            <Ionicons name="close-circle" size={26} color="red" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 10,
  },
  infoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
    justifyContent: 'center',
  },
  likeCount: {
    fontSize: 13,
    color: '#FF4D67',
    fontWeight: 'bold',
  },
  deleteIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    zIndex: 2,
  },
});
