import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useUser } from '../../context/UserContext';
import { fetchRecommendedTemplates } from '../../api/templateService';
import { useNavigation } from '@react-navigation/native';

const RecommendedTemplates = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [user]);

  if (loading) return <ActivityIndicator size="small" color="#6a380f" style={{ marginTop: 16 }} />;

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
            style={styles.templateCard}
            onPress={() =>
              navigation.navigate('TemplateDetails', { templateId: item._id })
            }
          >
            <Image source={{ uri: item.mainImage }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
  templateCard: {
    backgroundColor: '#fff',
    marginHorizontal: 8,
    borderRadius: 12,
    padding: 10,
    width: 170,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
