<<<<<<< HEAD
import axios from 'axios';

const BASE_URL = 'http://192.168.1.32:3000';
=======
import axios from "axios";

const BASE_URL = "http://192.168.1.14:3000";
>>>>>>> 9e1069c (first commit)

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
<<<<<<< HEAD
    console.error('Login failed:', error.message);
=======
    console.error("Login failed:", error.message);
>>>>>>> 9e1069c (first commit)
    return null;
  }
};

export const register = async (
  name,
  email,
  password,
  location,
  role,
  craft,
<<<<<<< HEAD
  avatarUrl,
=======
  avatarUrl
>>>>>>> 9e1069c (first commit)
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      name,
      email,
      password,
      location,
      role,
      craft,
      avatarUrl,
    });

<<<<<<< HEAD
    // ✅ Only return the user object
    return response.data.user;
  } catch (error) {
    console.error('Registration failed:', error.message);
=======
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.message);
>>>>>>> 9e1069c (first commit)
    return null;
  }
};
