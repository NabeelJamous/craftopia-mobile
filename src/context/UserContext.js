import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Create context (no types)
const UserContext = createContext(undefined);

// 2. Hook to access context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// 3. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error loading user from storage:", error);
      }
    };

    loadUser();
  }, []);

  const loginUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
