import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '../../context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { fetchRecommendedTemplates } from '../../api/templateService';
import TemplateDetailsModal from '../modals/TemplateDetailsModal';
import TemplateCard from '../templates/TemplateCard';

const RecommendedTemplates = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          if (!user?.email) return;
          const data = await fetchRecommendedTemplates(user.email);
          setTemplates(data);
        } catch (err) {
          console.error('Error fetching recommended templates:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [user?.email])
  );

  if (loading) {
    return <ActivityIndicator size="small" color="#6a380f" style={{ marginTop: 16 }} />;
  }

  if (!templates.length) {
    return <Text style={styles.empty}>No recommended templates found.</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Recommended Templates</Text>
      <FlatList
        horizontal
        data={templates}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedTemplate(item);
              setShowModal(true);
            }}
            style={{ marginHorizontal: 8 }}
          >
            <TemplateCard
              template={item}
              liked={false}
              onToggleLike={() => {}}
            />
          </TouchableOpacity>
        )}
      />

      <TemplateDetailsModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        template={selectedTemplate}
      />
    </View>
  );
};

export default RecommendedTemplates;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a380f',
    marginLeft: 20,
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
