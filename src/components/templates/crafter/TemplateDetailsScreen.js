import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  updateTemplate,
  createTemplate,
  uploadImage,
  generateFromImage,
} from '../../../api/templateService';
import {TagsByCraft} from '../../../constants/tags';
import WheelColorPicker from 'react-native-wheel-color-picker';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser} from '../../../context/UserContext'; // ✅ import user context

const DEFAULT_IMAGE = 'https://via.placeholder.com/280x180.png?text=No+Image';

const TemplateDetailsScreen = ({template, onClose, isNew = false}) => {
  const {user} = useUser(); // ✅ real user data
  const [form, setForm] = useState({
    name: template?.name || '',
    description: template?.description || '',
    price: template?.price || 0,
    galleryImages: template?.galleryImages || [],
    availableColors: template?.availableColors || [],
    tags: template?.tags || [],
    craftType: template?.craftType || '',
    crafterEmail: template?.crafterEmail || '',
    mainImage: template?.mainImage || '',
  });

  useEffect(() => {
    if (isNew && user?.role === 'crafter') {
      setForm(prev => ({
        ...prev,
        craftType: user.craft || '',
        crafterEmail: user.email || '',
      }));
    }
  }, []);

  const [saving, setSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColor, setTempColor] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const finalForm = {
        ...form,
        galleryImages:
          form.galleryImages?.length > 0 ? form.galleryImages : [DEFAULT_IMAGE],
        mainImage: form.galleryImages?.[0] || DEFAULT_IMAGE,
      };

      if (isNew) {
        await createTemplate(finalForm);
        Toast.show({
          type: 'success',
          text1: 'Created',
          text2: 'Template added!',
        });
      } else {
        await updateTemplate(finalForm._id, finalForm);
        Toast.show({
          type: 'success',
          text1: 'Updated',
          text2: 'Template updated!',
        });
      }

      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: isNew
          ? 'Failed to create template'
          : 'Failed to update template',
      });
    } finally {
      setSaving(false);
    }
  };

  const removeColor = color => {
    setForm(prev => ({
      ...prev,
      availableColors: prev.availableColors.filter(c => c !== color),
    }));
  };

  const addColor = color => {
    if (!color) return;
    setForm(prev => ({
      ...prev,
      availableColors: [...(prev.availableColors || []), color],
    }));
    setShowColorPicker(false);
    setTempColor(null);
  };

  const toggleTag = tag => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const removeGalleryImage = url => {
    setForm(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter(img => img !== url),
    }));
  };

  const addGalleryImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      if (result.assets?.length > 0) {
        const file = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };
        const imageUrl = await uploadImage(file);
        setForm(prev => ({
          ...prev,
          galleryImages: [...(prev.galleryImages || []), imageUrl],
        }));
      }
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  const tagOptions =
    TagsByCraft[
      Object.keys(TagsByCraft).find(
        key => key.toLowerCase() === form.craftType?.toLowerCase(),
      )
    ] || [];

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={form.galleryImages}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 10}}
          renderItem={({item}) => (
            <View style={styles.imageWrapper}>
              <Image source={{uri: item}} style={styles.galleryImage} />
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => removeGalleryImage(item)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addGalleryImage}>
          <Text style={styles.addBtnText}>Add Image</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={text => handleChange('name', text)}
        />

        <Text style={styles.label}>Craft Type</Text>
        <TextInput
          style={[styles.input, {opacity: 0.6}]}
          value={form.craftType}
          editable={false}
        />

        <Text style={styles.label}>Crafter</Text>
        <TextInput
          style={[styles.input, {opacity: 0.6}]}
          value={form.crafterEmail}
          editable={false}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          multiline
          numberOfLines={5}
          value={form.description}
          onChangeText={text => handleChange('description', text)}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={form.price?.toString()}
          keyboardType="numeric"
          onChangeText={text => handleChange('price', parseFloat(text))}
        />

        <Text style={styles.label}>Available Colors</Text>
        <View style={styles.chipContainer}>
          {form.availableColors?.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => removeColor(color)}
              style={[styles.colorDot, {backgroundColor: color}]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowColorPicker(true)}>
          <Text style={styles.addBtnText}>+ Select Color</Text>
        </TouchableOpacity>

        {showColorPicker && (
          <View style={{marginVertical: 20, paddingHorizontal: 16}}>
            <WheelColorPicker
              onColorChange={setTempColor}
              initialColor={form.availableColors?.[0] || '#ffffff'}
              thumbStyle={{height: 30, width: 30}}
            />
            <TouchableOpacity
              style={[styles.addBtn, {marginTop: 16}]}
              onPress={() => addColor(tempColor)}>
              <Text style={styles.addBtnText}>Confirm Color</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>Tags</Text>
        <View style={styles.chipContainer}>
          {tagOptions.map(tag => {
            const isSelected = form.tags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => toggleTag(tag)}
                style={[styles.tag, isSelected && styles.tagSelected]}>
                <Text
                  style={[
                    styles.tagText,
                    isSelected && styles.tagTextSelected,
                  ]}>
                  {tag}
                </Text>
                {isSelected && <Text style={styles.removeTagIcon}>✕</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSave}
          disabled={saving}>
          <Text style={styles.saveBtnText}>
            {saving ? 'Saving...' : 'Save Template'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {isNew && form.galleryImages.length > 0 && (
        <TouchableOpacity
          style={styles.floatingBtn}
          onPress={async () => {
            try {
              setSaving(true);
              const {title, description} = await generateFromImage(
                form.galleryImages[0],
              );
              setForm(prev => ({
                ...prev,
                name: title,
                description,
              }));
              Toast.show({
                type: 'success',
                text1: 'Generated!',
                text2: 'Title and description added.',
              });
            } catch (error) {
              console.error('AI Generation Error:', error.message);
              Toast.show({
                type: 'error',
                text1: 'Failed',
                text2: error.message,
              });
            } finally {
              setSaving(false);
            }
          }}
          disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.floatingBtnText}>
              <Ionicons name="sparkles" size={16} color="#fff" /> Generate Info
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TemplateDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#fff8f0',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
    color: '#6a380f',
  },
  input: {
    backgroundColor: '#f6f1ea',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginHorizontal: 16,
    borderColor: '#6a380f',
    borderWidth: 1,
  },
  textarea: {
    backgroundColor: '#f6f1ea',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginHorizontal: 16,
    borderColor: '#6a380f',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 8,
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#6a380f',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  tagSelected: {
    backgroundColor: '#6a380f',
  },
  tagText: {
    color: '#6a380f',
    fontSize: 13,
  },
  tagTextSelected: {
    color: '#fff',
  },
  removeTagIcon: {
    color: 'red',
    fontSize: 12,
    marginLeft: 6,
    marginTop: 1,
  },
  saveBtn: {
    backgroundColor: '#6a380f',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 16,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addBtn: {
    marginTop: 10,
    backgroundColor: '#6a380f',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginHorizontal: 16,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  galleryImage: {
    width: 280,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 12,
    marginRight: 12,
  },
  imageWrapper: {
    position: 'relative',
  },
  deleteImage: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a380f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
