import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedInputField from '../components/form/AnimatedInputField';
import MapSelector from '../components/map/MapSelector';
import FullScreenMap from '../components/map/FullScreenMap';
import OptionPickerModal from '../components/modals/OptionPickerModal';
import { Crafts, CraftIcons } from '../constants/crafts';
import { Roles, RoleIcons } from '../constants/roles';
import { register } from '../api/authService';
import { useUser } from '../context/UserContext';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const { setAndStoreUser } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(Roles.CUSTOMER);
  const [selectedCraft, setSelectedCraft] = useState('');
  const [address, setAddress] = useState('');

  const [coords, setCoords] = useState({
    latitude: 32.2227,
    longitude: 35.2621,
  });

  const [region, setRegion] = useState({
    latitude: 32.2227,
    longitude: 35.2621,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [isMapFullScreen, setMapFullScreen] = useState(false);
  const [isRoleModalVisible, setRoleModalVisible] = useState(false);
  const [isCraftModalVisible, setCraftModalVisible] = useState(false);

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

  const handleMapPress = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoords({ latitude, longitude });

    const apiKey = '61bf6cf4bfae49af84f187783a855112';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en&pretty=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data?.results?.length > 0) {
        const components = data.results[0].components;
        const city =
          components.city || components.town || components.village || '';
        const road = components.road || components.neighbourhood || '';
        const fullLocation = `${city}, ${road}`;
        setAddress(fullLocation);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !address || (role === Roles.CRAFTER && !selectedCraft)) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill out all required fields.',
      });
      return;
    }

    const location = {
      type: 'Point',
      coordinates: [coords.longitude, coords.latitude],
    };

    const userData = {
      name,
      email,
      password,
      location,
      role,
      craft: role === Roles.CRAFTER ? selectedCraft : '',
      avatarUrl: '',
    };

    console.log('📦 Sending to register:', userData);

    const newUser = await register(
      userData.name,
      userData.email,
      userData.password,
      userData.location,
      userData.role,
      userData.craft,
      userData.avatarUrl
    );

    if (newUser) {
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Redirecting...',
      });

      if (role === Roles.CUSTOMER) {
        await setAndStoreUser(newUser); // ✅ Store the new user in context
        navigation.replace('SetPreferences');
      } else {
        navigation.replace('Login');
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Please try again.',
      });
    }
  };

  if (isMapFullScreen) {
    return (
      <FullScreenMap
        coords={coords}
        region={region}
        onRegionChange={setRegion}
        onMapPress={handleMapPress}
        onClose={() => setMapFullScreen(false)}
      />
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ paddingBottom: 60 }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={!isRoleModalVisible && !isCraftModalVisible}
    >
      <Image source={require('../assets/welcome.png')} style={styles.wave} />

      <Animated.View
        style={[
          styles.form,
          {
            transform: [{ translateY: formTranslateY }],
            opacity: formOpacity,
          },
        ]}
      >
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.underline} />

        <AnimatedInputField
          icon="person-outline"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <AnimatedInputField
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <AnimatedInputField
          icon="lock-closed-outline"
          placeholder="Password"
          secure={true}
          value={password}
          onChangeText={setPassword}
        />

        <MapSelector
          coords={coords}
          region={region}
          address={address}
          onRegionChange={setRegion}
          onMapPress={handleMapPress}
          onExpand={() => setMapFullScreen(true)}
        />

        <TouchableOpacity
          onPress={() => setRoleModalVisible(true)}
          style={[styles.inputWrapper, { borderColor: '#6a380f' }]}
        >
          <Ionicons name={RoleIcons[role]} size={20} style={styles.icon} />
          <Text style={styles.input}>{role}</Text>
        </TouchableOpacity>

        {role === Roles.CRAFTER && (
          <>
            <TouchableOpacity
              onPress={() => setCraftModalVisible(true)}
              style={[styles.inputWrapper, { borderColor: '#6a380f' }]}
            >
              <Ionicons
                name={CraftIcons[selectedCraft] || 'construct-outline'}
                size={20}
                style={styles.icon}
              />
              <Text style={styles.input}>
                {selectedCraft || 'Select a craft'}
              </Text>
            </TouchableOpacity>
            {selectedCraft !== '' && (
              <Text style={{ color: 'green', marginBottom: 10 }}>
                ✅ Selected Craft: {selectedCraft}
              </Text>
            )}
          </>
        )}

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signupWrapper}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <OptionPickerModal
        visible={isRoleModalVisible}
        title="Select Role"
        options={Object.values(Roles)}
        icons={RoleIcons}
        onSelect={(r) => setRole(r)}
        onClose={() => setRoleModalVisible(false)}
      />

      <OptionPickerModal
        visible={isCraftModalVisible}
        title="Select Craft"
        options={Object.values(Crafts)}
        icons={CraftIcons}
        onSelect={(c) => setSelectedCraft(c)}
        onClose={() => setCraftModalVisible(false)}
      />
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#fff' },
  wave: { width, height: 450, resizeMode: 'cover' },
  form: { paddingHorizontal: 30, marginTop: -200 },
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  icon: { marginRight: 10, color: '#6a380f', fontSize: 25 },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'Segoe UI',
    color: '#333',
  },
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
  signupWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: { color: '#777', fontSize: 14, fontFamily: 'Segoe UI' },
  signupLink: {
    color: '#6a380f',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Segoe UI',
  },
});
