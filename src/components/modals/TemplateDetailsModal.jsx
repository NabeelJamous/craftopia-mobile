import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import BottomSheetModal from './BottomSheetModal';

const TemplateDetailsModal = ({ visible, onClose, template }) => {
  if (!template) return null;

  return (
    <BottomSheetModal visible={visible} onClose={onClose} height="90%">
      <ScrollView contentContainerStyle={styles.container}>
        {/* Image Carousel */}
        <FlatList
          horizontal
          data={template.galleryImages || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 16 }}
        />

        {/* Info Sections */}
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{template.name || '—'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Craft Type</Text>
          <Text style={styles.value}>{template.craftType || '—'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Crafter</Text>
          <Text style={styles.value}>{template.crafterEmail || '—'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{template.description || 'No description provided.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>${template.price || 'Not set'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Available Colors</Text>
          <View style={styles.colorRow}>
            {template.availableColors?.length ? (
              template.availableColors.map((color, i) => (
                <View
                  key={i}
                  style={[styles.colorDot, { backgroundColor: color }]}
                />
              ))
            ) : (
              <Text style={styles.noInfo}>No colors</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tags</Text>
          <View style={styles.tagRow}>
            {template.tags?.length ? (
              template.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noInfo}>No tags</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

export default TemplateDetailsModal;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  carouselImage: {
    width: 320,
    height: 200,
    borderRadius: 14,
    marginRight: 12,
  },
  section: {
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 4,
  },
  value: {
    backgroundColor: '#fcecd9',
    padding: 10,
    borderRadius: 8,
    color: '#333',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  colorDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#e2c9b1',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    color: '#6a380f',
    fontWeight: '500',
  },
  noInfo: {
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
