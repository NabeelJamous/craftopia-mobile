import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUser} from '../context/UserContext';

import CrafterHomeScreen from '../screens/crafter/CrafterHomeScreen';
import CrafterTemplatesScreen from '../screens/crafter/CrafterTemplatesScreen';
import CrafterSchedulesScreen from '../screens/crafter/CrafterSchedulesScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CrafterTabs = () => {
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

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Templates':
              iconName = 'images-outline';
              break;
            case 'Schedules':
              iconName = 'calendar-outline';
              break;
            case 'Chat':
              iconName = 'chatbubbles-outline';
              break;
            case 'Workshops':
              iconName = 'construct-outline';
              break;
          }

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
                size={28}
                color={focused ? '#fff' : '#6a380f'}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={CrafterHomeScreen} />
      <Tab.Screen name="Templates" component={CrafterTemplatesScreen} />
      <Tab.Screen name="Schedules" component={CrafterSchedulesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default CrafterTabs;

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
