import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

// Sample slides data
const slides = [
  {
    title: 'Skilled Hands, Crafted Excellence',
    subtitle: 'Connect with top-tier professionals...',
    image: require('../../assets/bg1.png'),
  },
  {
    title: 'Bring Your Vision to Life',
    subtitle: 'Collaborate with creative experts...',
    image: require('../../assets/bg2.png'),
  },
  {
    title: 'Crafters Just a Message Away',
    subtitle: 'Chat directly with verified craftsmen...',
    image: require('../../assets/bg3.png'),
  },
];

const CarouselComponent = () => {
  const renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.slide}>
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.overlay}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <Carousel
      data={slides}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
      autoplay
      loop
      autoplayInterval={5000}
    />
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  slide: {
    width: width,
    height: 250,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});
