import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OptionPickerModal = ({
  visible,
  title,
  options,
  onSelect,
  onClose,
  icons = {},
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
<<<<<<< HEAD
      transparent={true}
=======
      transparent
>>>>>>> 9e1069c (first commit)
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <View style={styles.optionContent}>
                  {icons[item] && (
                    <Ionicons
                      name={icons[item]}
                      size={20}
                      color="#6a380f"
                      style={styles.icon}
                    />
                  )}
                  <Text style={styles.optionText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default OptionPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '60%',
<<<<<<< HEAD
    zIndex: 9999,
=======
>>>>>>> 9e1069c (first commit)
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 10,
    fontFamily: 'Segoe UI',
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Segoe UI',
  },
});
