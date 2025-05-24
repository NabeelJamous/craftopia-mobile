import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

import {useUser} from '../context/UserContext';
import {saveUserPreferences, getUserByEmail} from '../api/userService';
import {TagsByCraft, TagValues} from '../constants/tags';

const SetPreferencesScreen = () => {
  const navigation = useNavigation();
  const {user, setAndStoreUser} = useUser();

  const [selectedColors, setSelectedColors] = useState([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [tempColor, setTempColor] = useState('#6a380f');
  const [selectedTags, setSelectedTags] = useState([]);

  const isCrafter = user?.role === 'crafter';
  const availableTags = isCrafter ? TagsByCraft[user?.craft] || [] : TagValues;

  const addColor = () => {
    if (!selectedColors.includes(tempColor)) {
      setSelectedColors([...selectedColors, tempColor]);
    }
    setColorPickerVisible(false);
  };

  const removeColor = color => {
    setSelectedColors(selectedColors.filter(c => c !== color));
  };

  const toggleTag = tag => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag],
    );
  };

  const handleSubmit = async () => {
    try {
      if (!user?.email) {
        Toast.show({type: 'error', text1: 'You must be logged in.'});
        return;
      }

      console.log('📤 Sending preferences:', {
        email: user.email,
        favoriteColors: selectedColors,
        preferredTags: selectedTags,
      });

      await saveUserPreferences({
        email: user.email,
        favoriteColors: selectedColors,
        preferredTags: selectedTags,
      });

      const updatedUser = await getUserByEmail(user.email);
      await setAndStoreUser(updatedUser); // ✅ updates context and AsyncStorage

      Toast.show({type: 'success', text1: 'Preferences saved!'});

      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {screen: 'Home'}}],
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to save preferences.',
        text2: err.response?.data?.error || err.message,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Select Your Preferences</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Favorite Colors</Text>
            <View style={styles.colorRow}>
              {selectedColors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorCircle, {backgroundColor: color}]}
                  onPress={() => removeColor(color)}
                />
              ))}
            </View>

            {!colorPickerVisible ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setColorPickerVisible(true)}>
                <Text style={styles.buttonText}>+ Add Color</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.pickerWrapper}>
                <ColorPicker
                  color={tempColor}
                  swatchesOnly={false}
                  onColorChange={setTempColor}
                  thumbSize={30}
                  sliderSize={20}
                  noSnap={true}
                  row={false}
                  style={{width: 260, height: 260}}
                />
                <TouchableOpacity style={styles.button} onPress={addColor}>
                  <Text style={styles.buttonText}>Confirm Color</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferred Tags</Text>
            <View style={styles.tagRow}>
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagBox,
                      {
                        backgroundColor: isSelected ? '#6a380f' : '#fff',
                        borderColor: '#6a380f',
                      },
                    ]}
                    onPress={() => toggleTag(tag)}>
                    <Text
                      style={[
                        styles.tagText,
                        {color: isSelected ? '#fff' : '#6a380f'},
                      ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPreferencesScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f7e9d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '90%',
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    color: '#6a380f',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#6a380f',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 4,
  },
  pickerWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 2,
    borderRadius: 20,
  },
  tagText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#6a380f',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
