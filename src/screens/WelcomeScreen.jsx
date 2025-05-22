import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/welcome.png')}
      style={styles.background}
    >
      {/* Logo at Top Center */}
      <View style={styles.logoWrapper}>
        <Image
          source={require('../assets/light-logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Bottom Text */}
      <View style={styles.bottomTextWrapper}>
        <Text style={styles.title}>Welcome To Craftopia</Text>
        <Text style={styles.subtitle}>
          Discover unique handmade crafts crafted with passion.
        </Text>
      </View>

      {/* Button Bottom Right */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  bottomTextWrapper: {
    position: 'absolute',
    bottom: 220,
    left: 15,
    right: 30,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a380f',
    fontFamily: 'Segoe UI',
    marginBottom: 20,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 20,
    color: '#6a380f',
    fontFamily: 'Segoe UI',
    textAlign: 'left',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: '#6a380f',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Segoe UI',
  },
});
