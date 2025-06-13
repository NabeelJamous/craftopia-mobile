import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUser} from '../context/UserContext';
import MapSelector from '../components/map/MapSelector';
import FullScreenMap from '../components/map/FullScreenMap';
import {getUserByEmail} from '../api/userService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

const ProfileScreen = () => {
  const {user, setUser} = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState({
    latitude: 32.2227,
    longitude: 35.2621,
  });
  const [region, setRegion] = useState({
    latitude: 32.2227,
    longitude: 35.2621,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [isMapFullScreen, setMapFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      getUserByEmail(user.email).then(data => {
        if (data) {
          setName(data.name || '');
          setAvatarUrl(data.avatarUrl || '');
          const coordinates = data.location?.coordinates || [35.2621, 32.2227];
          setCoords({latitude: coordinates[1], longitude: coordinates[0]});
          setRegion({
            latitude: coordinates[1],
            longitude: coordinates[0],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setAddress(data.location?.address || '');
        }
      });
    }
  }, [user.email]);

  const pickImage = async () => {
    const options = {mediaType: 'photo', quality: 1};
    launchImageLibrary(options, async response => {
      if (response.didCancel || response.errorCode) return;
      const asset = response.assets?.[0];
      if (asset?.uri) uploadImageToCloudinary(asset);
    });
  };

  const uploadImageToCloudinary = async asset => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri:
          Platform.OS === 'ios' ? asset.uri.replace('file://', '') : asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || 'avatar.jpg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setAvatarUrl(data.secure_url);
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMapPress = async e => {
    const {latitude, longitude} = e.nativeEvent.coordinate;
    setCoords({latitude, longitude});

    const apiKey = '61bf6cf4bfae49af84f187783a855112';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

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

  const updateUserProfile = async ({
    userId,
    name,
    password,
    avatarUrl,
    location,
  }) => {
    try {
      const response = await fetch(
        `http://192.168.1.18:3000/user/update-profile/${userId}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name, password, avatarUrl, location}),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile update failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error.message);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const location = {
        type: 'Point',
        coordinates: [coords.longitude, coords.latitude],
        address,
      };

      const updated = await updateUserProfile({
        userId: user._id,
        name,
        password,
        avatarUrl,
        location,
      });

      setUser(updated.user);
      Toast.show({
        type: 'success',
        text1: 'Profile updated!',
      });
    } catch (error) {
      console.error('Update failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Update failed!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully!',
      });
      navigation.replace('Login');
    } catch (err) {
      console.error('Logout error:', err);
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
      contentContainerStyle={[styles.container, {paddingBottom: 80}]}
      keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={pickImage}>
        <Image source={{uri: avatarUrl}} style={styles.avatar} />
        {loading && <ActivityIndicator style={styles.loader} />}
      </TouchableOpacity>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.emailRow}>
        <Ionicons
          name="mail-outline"
          size={18}
          color="#6a380f"
          style={{marginRight: 6}}
        />
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          placeholder="New Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <MapSelector
        coords={coords}
        region={region}
        address={address}
        onRegionChange={setRegion}
        onMapPress={handleMapPress}
        onExpand={() => setMapFullScreen(true)}
        height={300}
        borderRadius={16}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={loading}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#6a380f"
          style={{marginRight: 6}}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fef8f4',
    alignItems: 'center',
    flexGrow: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#3d1f0f',
  },
  loader: {
    position: 'absolute',
    top: 60,
    left: 60,
    transform: [{translateX: -10}, {translateY: -10}],
  },
  name: {
    fontSize: 22,
    color: '#3d1f0f',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3d1f0f',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#6a380f',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 30,
  },
  logoutText: {
    color: '#6a380f',
    fontWeight: 'bold',
    fontSize: 15,
  },
  email: {
    fontSize: 15,
    color: '#666',
    marginTop: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
});
