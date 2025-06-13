// File: src/navigation/MainTabs.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser} from '../context/UserContext';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import TemplatesScreen from '../screens/TemplatesScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {user} = useUser();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Appointments') iconName = 'calendar-outline';
          else if (route.name === 'Templates') iconName = 'images-outline';
          else if (route.name === 'Chat') iconName = 'chatbubbles-outline';
          else if (route.name === 'Workshops') iconName = 'school-outline';

          if (route.name === 'Profile') {
            return (
              <View
                style={[styles.iconContainer, focused && styles.activeIcon]}>
                {user?.avatarUrl ? (
                  <Image source={{uri: user.avatarUrl}} style={styles.avatar} />
                ) : (
                  <View style={styles.fallbackAvatar}>
                    <Text style={styles.avatarText}>
                      {user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </Text>
                  </View>
                )}
              </View>
            );
          }

          return (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons
                name={iconName}
                size={28} // ✅ Bigger icon size
                color={focused ? '#fff' : '#6a380f'}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Templates" component={TemplatesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 35,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  tabItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    paddingBottom: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: -16,
  },
  activeIcon: {
    backgroundColor: '#6a380f',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  fallbackAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6a380f',
  },
});

export default MainTabs;
