import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({query, setQuery, onReset, onGlobalReset}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#aaa" />
      <TextInput
        placeholder="Search by name or tag..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {query?.length > 0 && (
        <TouchableOpacity onPress={onReset}>
          <Ionicons name="close-circle" size={20} color="#6a380f" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onGlobalReset}>
        <Ionicons name="refresh-circle" size={22} color="#6a380f" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f6eede',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Segoe UI',
  },
});
