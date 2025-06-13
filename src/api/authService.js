import axios from 'axios';

const BASE_URL = 'http://192.168.1.18:3000';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Login failed:', error.message);
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
  avatarUrl,
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

    // ✅ Only return the user object
    return response.data.user;
  } catch (error) {
    console.error('Registration failed:', error.message);
    return null;
  }
};
