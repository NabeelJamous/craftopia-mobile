import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {importTemplatesFromProfile} from '../../api/templateService';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PinterestImportModal = ({visible, onClose, email}) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!profileUrl.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid Pinterest profile URL.',
      });
      return;
    }

    setLoading(true);
    try {
      await importTemplatesFromProfile(profileUrl.trim(), email);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Templates imported successfully!',
      });
      onClose();
      setProfileUrl('');
    } catch (err) {
      console.error('Pinterest import error:', err);
      Toast.show({
        type: 'error',
        text1: 'Import Failed',
        text2: 'Could not fetch templates from profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Import from Pinterest</Text>
          <TextInput
            placeholder="Paste Pinterest Profile URL"
            style={styles.input}
            value={profileUrl}
            onChangeText={setProfileUrl}
            editable={!loading}
          />
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.iconButton}
              disabled={loading}>
              <Ionicons name="close" size={24} color="#6a380f" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImport}
              style={styles.importButton}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.importText}>Import</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PinterestImportModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a380f',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    borderColor: '#6a380f',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#eee',
    borderRadius: 30,
    padding: 10,
  },
  importButton: {
    backgroundColor: '#6a380f',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  importText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
