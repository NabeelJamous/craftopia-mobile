import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedInputField = ({
  icon,
  placeholder,
  secure = false,
  value,
  onChangeText,
  rightIcon,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.inputWrapper,
        {
          transform: [{ scale: scaleAnim }],
          borderColor: focused ? '#6a380f' : '#ccc',
        },
      ]}
    >
      <Ionicons name={icon} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </Animated.View>
  );
};

export default AnimatedInputField;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
    color: '#6a380f',
    fontSize: 25,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'Segoe UI',
    color: '#333',
  },
  rightIcon: {
    marginLeft: 10,
  },
});
