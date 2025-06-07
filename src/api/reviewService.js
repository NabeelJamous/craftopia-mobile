<<<<<<< HEAD
import axios from 'axios';

export const fetchReviews = async () => {
  const res = await axios.get('http://192.168.1.32:3000/reviews/getAllReviews');
  return res.data;
};

export const addReview = async ({email, rating, message, type, to = null}) => {
  const response = await axios.post(
    'http://192.168.1.32:3000/reviews/addReview',
    {
=======
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
>>>>>>> 9e1069c (first commit)
      email,
      rating,
      message,
      type,
      to,
<<<<<<< HEAD
    },
  );
  return response.data;
};

export const getReviewsByEmail = async email => {
  const res = await axios.get(
    `http://192.168.1.32:3000/reviews/getByEmail?email=${email}`,
  );
  return res.data;
=======
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
>>>>>>> 9e1069c (first commit)
};
