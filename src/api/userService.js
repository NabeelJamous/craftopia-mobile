import axios from 'axios';

const API_URL = 'http://192.168.1.32:3000/user';

export const fetchUsers = async ({
  query,
  selectedCraft,
  sortByRating,
  location,
  maxDistance,
}) => {
  try {
    const params = {};
    if (query) params.query = query;
    if (selectedCraft) params.craft = selectedCraft;
    if (sortByRating) {
      params.sortBy = 'rating';
      params.order = sortByRating;
    }
    if (location) {
      params.lat = location.lat;
      params.lng = location.lng;
    }
    if (maxDistance) params.maxDistance = maxDistance;

    const res = await axios.get(`${API_URL}/search`, {
      params,
    });
    return res.data.users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
};

export const getUserByEmail = async email => {
  const response = await axios.get(`${API_URL}/email/${email}`);
  return response.data;
};

export const saveUserPreferences = async ({
  email,
  favoriteColors,
  preferredTags,
}) => {
  try {
    const response = await axios.put(`${API_URL}/preferences`, {
      email,
      favoriteColors,
      preferredTags,
    });

    return response.data;
  } catch (err) {
    console.error(
      'Failed to save preferences:',
      err.response?.data || err.message,
    );
    throw err;
  }
};
