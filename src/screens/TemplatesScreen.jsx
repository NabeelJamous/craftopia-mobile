import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { fetchSortedTemplates } from '../api/templateService';
import { getUserLikedTemplates, toggleLike } from '../api/likeService';
import { useUser } from '../context/UserContext';

import TemplateCard from '../components/templates/TemplateCard';
import SearchBar from '../components/templates/SearchBar';
import PriceSlider from '../components/templates/PriceSlider';
import OptionPickerModal from '../components/modals/OptionPickerModal';
import TemplateDetailsModal from '../components/modals/TemplateDetailsModal';

import { CraftList } from '../constants/crafts';

const TemplatesScreen = () => {
  const { user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [likedTemplateIds, setLikedTemplateIds] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [loading, setLoading] = useState(true);
  const [showCraftModal, setShowCraftModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const [templateData, likedIds] = await Promise.all([
        fetchSortedTemplates(),
        getUserLikedTemplates(user.email),
      ]);
      setTemplates(templateData);
      setLikedTemplateIds(likedIds || []);
    } catch (err) {
      console.error('Failed to load templates', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesCraft =
      !selectedCraft ||
      template.craftType?.toLowerCase() === selectedCraft.toLowerCase();

    const matchesSearch =
      !query ||
      template.name?.toLowerCase().includes(query.toLowerCase()) ||
      template.tags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      ) ||
      template.crafterName?.toLowerCase().includes(query.toLowerCase());

    const matchesPrice =
      typeof template.price === 'number' &&
      template.price >= priceRange[0] &&
      template.price <= priceRange[1];

    return matchesCraft && matchesSearch && matchesPrice;
  });

  const handleLikeToggle = async (templateId) => {
    try {
      const result = await toggleLike(user.email, templateId);
      if (result.liked) {
        setLikedTemplateIds((prev) => [...prev, templateId]);
      } else {
        setLikedTemplateIds((prev) => prev.filter((id) => id !== templateId));
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  const resetAllFilters = () => {
    setQuery('');
    setSelectedCraft('');
    setPriceRange([0, 1000]);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onReset={() => setQuery('')}
        onGlobalReset={resetAllFilters}
      />

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowCraftModal(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedCraft || 'Select a Craft'}
        </Text>
      </TouchableOpacity>

      <OptionPickerModal
        visible={showCraftModal}
        title="Select a Craft"
        options={CraftList}
        onSelect={(craft) => setSelectedCraft(craft)}
        onClose={() => setShowCraftModal(false)}
      />

      <View style={styles.sliderWrapper}>
        <Text style={styles.sliderLabel}>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Text>
        <PriceSlider range={priceRange} onChange={setPriceRange} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6a380f" />
      ) : (
        <FlatList
          data={filteredTemplates}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedTemplate(item);
                setShowDetailsModal(true);
              }}
            >
              <TemplateCard
                template={item}
                liked={likedTemplateIds.includes(item._id)}
                onToggleLike={() => handleLikeToggle(item._id)}
              />
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.gridContainer}
        />
      )}

      <TemplateDetailsModal
        visible={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        template={selectedTemplate}
      />
    </View>
  );
};

export default TemplatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f2',
    padding: 16,
  },
  dropdown: {
    backgroundColor: '#f6eede',
    borderWidth: 1,
    borderColor: '#6a380f',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignSelf: 'center',
    marginBottom: 16,
  },
  dropdownText: {
    color: '#6a380f',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Segoe UI',
  },
  sliderWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Segoe UI',
  },
  gridContainer: {
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
});
