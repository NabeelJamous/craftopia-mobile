import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getAllTemplates } from '../api/templateService';

const TemplateDetailsScreen = () => {
  const route = useRoute();
  const { templateId } = route.params;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const all = await getAllTemplates(); // Or a new `getTemplateById()` if you prefer
        const found = all.find(t => t._id === templateId);
        setTemplate(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  if (!template) return <Text style={{ margin: 20 }}>Template not found.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{template.name}</Text>
      <Text style={styles.description}>{template.description}</Text>
      {/* Add more details and image */}
    </View>
  );
};

export default TemplateDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
  },
});
