<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
=======
import React, {useState, useRef, useEffect} from 'react';
>>>>>>> 9e1069c (first commit)
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import AnimatedInputField from '../components/form/AnimatedInputField';
<<<<<<< HEAD
import { login } from '../api/authService';
import { useUser } from '../context/UserContext'; // ✅ context import

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
=======
import {login} from '../api/authService';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
>>>>>>> 9e1069c (first commit)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

<<<<<<< HEAD
  const { loginUser } = useUser(); // ✅ access context login method

=======
>>>>>>> 9e1069c (first commit)
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
<<<<<<< HEAD
  if (!email || !password) {
    Toast.show({
      type: 'error',
      text1: 'Missing Fields',
      text2: 'Please enter your email and password.',
    });
    return;
  }

  try {
    const response = await login(email, password);
    console.log('🔐 Login API response:', response);

    if (response?.user) {
      await loginUser(response.user);
      console.log('✅ User saved to context:', response.user);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: `Welcome, ${response.user.name || 'user'}!`,
      });

      // 🔽 Redirect based on role
      if (response.user.role === 'crafter') {
        navigation.replace('CrafterHome');
      } else {
        navigation.replace('Home');
      }
    } else {
      throw new Error('Invalid credentials or missing user data');
    }
  } catch (err) {
    console.error('❌ Login Error:', err.message);
    Toast.show({
      type: 'error',
      text1: 'Login Failed',
      text2: 'Invalid credentials. Try again.',
    });
  }
};

=======
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter your email and password.',
      });
      return;
    }

    const response = await login(email, password);

    if (response) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid credentials. Try again.',
      });
    }
  };
>>>>>>> 9e1069c (first commit)

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Image source={require('../assets/welcome.png')} style={styles.wave} />

      <Animated.View
        style={[
          styles.form,
<<<<<<< HEAD
          { transform: [{ translateY: formTranslateY }], opacity: formOpacity },
        ]}
      >
=======
          {transform: [{translateY: formTranslateY}], opacity: formOpacity},
        ]}>
>>>>>>> 9e1069c (first commit)
        <Text style={styles.title}>Sign in</Text>
        <View style={styles.underline} />

        <AnimatedInputField
          icon="mail-outline"
          placeholder="demo@email.com"
          value={email}
          onChangeText={setEmail}
        />

        <AnimatedInputField
          icon="lock-closed-outline"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secure={!showPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color="#aaa"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          }
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.rememberMe}
<<<<<<< HEAD
            onPress={() => setRememberMe(!rememberMe)}
          >
=======
            onPress={() => setRememberMe(!rememberMe)}>
>>>>>>> 9e1069c (first commit)
            <Ionicons
              name={rememberMe ? 'checkbox' : 'square-outline'}
              size={18}
              color="#6a380f"
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupWrapper}>
          <Text style={styles.signupText}>Don’t have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, backgroundColor: '#fff' },
  wave: { width, height: 700, resizeMode: 'cover' },
  form: { paddingHorizontal: 30, marginTop: -280 },
=======
  container: {flex: 1, backgroundColor: '#fff'},
  wave: {width, height: 700, resizeMode: 'cover'},
  form: {paddingHorizontal: 30, marginTop: -280},
>>>>>>> 9e1069c (first commit)
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Segoe UI',
  },
  underline: {
    width: 120,
    height: 3,
    backgroundColor: '#6a380f',
    marginBottom: 60,
    borderRadius: 2,
  },
<<<<<<< HEAD
  iconRight: { marginLeft: 10 },
=======
  iconRight: {marginLeft: 10},
>>>>>>> 9e1069c (first commit)
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
<<<<<<< HEAD
  rememberMe: { flexDirection: 'row', alignItems: 'center' },
=======
  rememberMe: {flexDirection: 'row', alignItems: 'center'},
>>>>>>> 9e1069c (first commit)
  rememberText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#333',
    fontFamily: 'Segoe UI',
  },
<<<<<<< HEAD
  forgot: { fontSize: 14, color: '#6a380f', fontWeight: '600' },
=======
  forgot: {fontSize: 14, color: '#6a380f', fontWeight: '600'},
>>>>>>> 9e1069c (first commit)
  loginBtn: {
    backgroundColor: '#6a380f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'Segoe UI',
  },
<<<<<<< HEAD
  signupWrapper: { flexDirection: 'row', justifyContent: 'center' },
=======
  signupWrapper: {flexDirection: 'row', justifyContent: 'center'},
>>>>>>> 9e1069c (first commit)
  signupText: {
    color: '#777',
    fontSize: 14,
    fontFamily: 'Segoe UI',
  },
  signupLink: {
    color: '#6a380f',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Segoe UI',
  },
});
