import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useUser} from '../../context/UserContext';
import {useFocusEffect} from '@react-navigation/native';
import {
  getTemplatesByCrafter,
  importTemplatesFromProfile,
} from '../../api/templateService';
import TemplateCard from '../../components/templates/crafter/TemplateCard';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import TemplateDetailsScreen from '../../components/templates/crafter/TemplateDetailsScreen';
import PinterestImportModal from '../../components/modals/PinterestImportModal';

const CrafterTemplatesScreen = () => {
  const {user} = useUser();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [focusedCardId, setFocusedCardId] = useState(null);
  const [showPinterestModal, setShowPinterestModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const data = await getTemplatesByCrafter(user.email);
      setTemplates(data);
    } catch (err) {
      console.error('Error fetching templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTemplates();
    }, [user.email]),
  );

  const handleTemplatePress = template => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  const handleFocusCard = id => {
    setFocusedCardId(id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleClearFocus = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setFocusedCardId(null);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Templates</Text>

      {focusedCardId && (
        <Pressable
          onPress={handleClearFocus}
          style={[StyleSheet.absoluteFill, {zIndex: 1}]}>
          <Animated.View style={[StyleSheet.absoluteFill, {opacity: fadeAnim}]}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          </Animated.View>
        </Pressable>
      )}

      <View style={{zIndex: 2}}>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#6a380f" />
          </View>
        ) : (
          <FlatList
            data={templates}
            keyExtractor={item => item._id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={{paddingBottom: 100}}
            renderItem={({item}) => (
              <TemplateCard
                template={item}
                onPress={() => handleTemplatePress(item)}
                onDeleted={fetchTemplates}
                isFocused={focusedCardId === item._id}
                hasFocus={!!focusedCardId}
                onFocusChange={handleFocusCard}
              />
            )}
          />
        )}
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setShowAddModal(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => setShowPinterestModal(true)}>
          <FontAwesome name="pinterest" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Edit Template Modal */}
      <BottomSheetModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        height="85%">
        {selectedTemplate && (
          <TemplateDetailsScreen
            template={selectedTemplate}
            onClose={() => {
              setShowModal(false);
              fetchTemplates();
            }}
          />
        )}
      </BottomSheetModal>

      {/* Add New Template Modal */}
      <BottomSheetModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        height="85%">
        <TemplateDetailsScreen
          isNew
          template={{
            name: '',
            description: '',
            price: 0,
            tags: [],
            galleryImages: [],
            availableColors: [],
            crafterEmail: user.email,
            craftType: user.craftType || 'Carpenter',
          }}
          onClose={() => {
            setShowAddModal(false);
            fetchTemplates();
          }}
        />
      </BottomSheetModal>

      {/* Pinterest Import Modal */}
      <PinterestImportModal
        visible={showPinterestModal}
        onClose={() => {
          setShowPinterestModal(false);
          fetchTemplates();
        }}
        email={user.email}
      />
    </View>
  );
};

export default CrafterTemplatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6a380f',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
    gap: 12,
    zIndex: 10,
  },
  fabButton: {
    backgroundColor: '#6a380f',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
