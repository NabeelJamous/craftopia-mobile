import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";

const MapSelector = ({
  coords,
  region,
  address,
  onRegionChange,
  onMapPress,
  onExpand,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tap the map to select your address:</Text>

      {address && <Text style={styles.addressText}>{address}</Text>}

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChange}
          onPress={onMapPress}
        >
          <Marker coordinate={coords} title="Selected Location" />
        </MapView>

        <TouchableOpacity style={styles.expandIcon} onPress={onExpand}>
          <Ionicons name="expand-outline" size={24} color="#6a380f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapSelector;

const styles = StyleSheet.create({
  container: { marginBottom: 25 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6a380f",
    marginBottom: 5,
    fontFamily: "Segoe UI",
  },
  addressText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Segoe UI",
    marginBottom: 4,
  },
  coordsText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Segoe UI",
  },
  mapWrapper: { position: "relative" },
  map: { width: "100%", height: 200, borderRadius: 10 },
  expandIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
});
