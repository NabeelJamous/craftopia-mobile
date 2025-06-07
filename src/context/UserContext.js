<<<<<<< HEAD
import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
=======
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Create context (no types)
const UserContext = createContext(undefined);

// 2. Hook to access context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
>>>>>>> 9e1069c (first commit)
  }
  return context;
};

<<<<<<< HEAD
export const UserProvider = ({children}) => {
=======
// 3. Provider component
export const UserProvider = ({ children }) => {
>>>>>>> 9e1069c (first commit)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
<<<<<<< HEAD
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user from storage:', error);
=======
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user from storage:", error);
>>>>>>> 9e1069c (first commit)
      }
    };

    loadUser();
  }, []);

<<<<<<< HEAD
  const loginUser = async userData => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
=======
  const loginUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
>>>>>>> 9e1069c (first commit)
  };

  const logoutUser = async () => {
    setUser(null);
<<<<<<< HEAD
    await AsyncStorage.removeItem('user');
  };

  const setAndStoreUser = async userData => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider
      value={{user, setUser, loginUser, logoutUser, setAndStoreUser}}>
=======
    await AsyncStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
>>>>>>> 9e1069c (first commit)
      {children}
    </UserContext.Provider>
  );
};
