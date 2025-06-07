import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {UserProvider} from './src/context/UserContext';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
<<<<<<< HEAD
import SetPreferencesScreen from './src/screens/SetPreferencesScreen';
import MainTabs from './src/navigation/MainTabs';
import TemplateDetailsScreen from './src/screens/TemplateDetailsScreen'; // ✅ Add this import
import CrafterTabs from './src/navigation/CrafterTabs';
=======
// import HomeScreen from './src/screens/HomeScreen';
>>>>>>> 9e1069c (first commit)

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
<<<<<<< HEAD
          <Stack.Screen
            name="SetPreferences"
            component={SetPreferencesScreen}
          />
          <Stack.Screen name="Home" component={MainTabs} />
          <Stack.Screen
            name="TemplateDetails"
            component={TemplateDetailsScreen}
          />
          <Stack.Screen name="CrafterHome" component={CrafterTabs} />
=======
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
>>>>>>> 9e1069c (first commit)
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </UserProvider>
  );
};

export default App;
