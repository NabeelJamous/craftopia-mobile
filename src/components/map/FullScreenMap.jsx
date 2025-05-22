import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FullScreenMap = ({
  coords,
  region,
  onRegionChange,
  onMapPress,
  onClose,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
        onPress={onMapPress}
      >
        <Marker coordinate={coords} title="Selected Location" />
      </MapView>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Close Map</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FullScreenMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  closeText: {
    color: '#6a380f',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
