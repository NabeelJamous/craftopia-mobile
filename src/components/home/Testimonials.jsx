import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { fetchReviews } from "../../api/reviewService";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews()
      .then(setReviews)
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.user?.avatarUrl }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.user?.name || "Anonymous"}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.rating}>
        {"⭐".repeat(item.rating)}{" "}
        {"☆".repeat(5 - item.rating)}
      </Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>What People Say</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={reviews}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff8f1",
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6a380f",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    width: 250,
    padding: 15,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6a380f",
    marginBottom: 5,
    textAlign: "center",
  },
  message: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#ffcc00",
  },
});
