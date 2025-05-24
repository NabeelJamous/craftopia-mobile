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
import WorkshopsScreen from '../screens/WorkshopsScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const {user} = useUser();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({focused, color}) => {
          if (route.name === 'Home') {
            return <Ionicons name="home-outline" size={24} color={color} />;
          } else if (route.name === 'Appointments') {
            return <Ionicons name="calendar-outline" size={24} color={color} />;
          } else if (route.name === 'Templates') {
            return <Ionicons name="images-outline" size={24} color={color} />;
          } else if (route.name === 'Chat') {
            return (
              <Ionicons name="chatbubbles-outline" size={24} color={color} />
            );
          } else if (route.name === 'Workshops') {
            return <Ionicons name="school-outline" size={24} color={color} />;
          } else if (route.name === 'Profile') {
            return user?.avatarUrl ? (
              <Image source={{uri: user.avatarUrl}} style={styles.avatar} />
            ) : (
              <View style={styles.fallbackAvatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </Text>
              </View>
            );
          }
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6a380f',
        tabBarActiveBackgroundColor: '#6a380f',
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
      <Tab.Screen name="Templates" component={TemplatesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Workshops" component={WorkshopsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  fallbackAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
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
