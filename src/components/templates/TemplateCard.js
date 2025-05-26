import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2; // 16 padding + 16 total gap (8 on each side)

const TemplateCard = ({template, liked, onToggleLike}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggleLike} style={styles.likeIcon}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={20}
          color="#6a380f"
        />
      </TouchableOpacity>

      <Image source={{uri: template.mainImage}} style={styles.image} />

      <Text style={styles.title}>{template.name}</Text>
      <Text style={styles.craft}>{template.craftType?.toLowerCase()}</Text>
      <Text style={styles.by}>by {template.crafterName}</Text>

      <View style={styles.colors}>
        {template.availableColors?.map((color, index) => (
          <View
            key={index}
            style={[styles.colorDot, {backgroundColor: color}]}
          />
        ))}
      </View>

      <Text style={styles.price}>${template.price?.toFixed(2)}</Text>
    </View>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#6a380f',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  likeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    fontFamily: 'Segoe UI',
    textAlign: 'center',
  },
  craft: {
    color: '#333',
    fontSize: 14,
    textTransform: 'lowercase',
    fontFamily: 'Segoe UI',
  },
  by: {
    color: '#888',
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 6,
    fontFamily: 'Segoe UI',
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  price: {
    fontWeight: '600',
    fontSize: 16,
    color: '#6a380f',
    marginTop: 6,
  },
});
