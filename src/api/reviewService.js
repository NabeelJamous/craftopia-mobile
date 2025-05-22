import axios from "axios";

const API_BASE_URL = "http://192.168.1.14:3000/reviews";

export const fetchReviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllReviews`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reviews:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addReview = async ({
  email,
  rating,
  message,
  type,
  to = null,
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addReview`, {
      email,
      rating,
      message,
      type,
      to,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding review:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getReviewsByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getByEmail`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching reviews by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
