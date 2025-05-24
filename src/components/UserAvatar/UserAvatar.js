import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const UserAvatar = ({previewUrl, uploading, user, size = 60, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.avatar, {width: size, height: size}]}>
      {uploading ? (
        <Text style={styles.text}>Uploading...</Text>
      ) : previewUrl ? (
        <Image source={{uri: previewUrl}} style={styles.image} />
      ) : (
        <Text style={styles.text}>
          {user?.name?.charAt(0)?.toUpperCase() || '?'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    color: '#6a380f',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default UserAvatar;
