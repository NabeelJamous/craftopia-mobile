import axios from 'axios';

export const fetchReviews = async () => {
  const res = await axios.get('http://192.168.1.17:3000/reviews/getAllReviews');
  return res.data;
};

export const addReview = async ({email, rating, message, type, to = null}) => {
  const response = await axios.post(
    'http://192.168.1.17:3000/reviews/addReview',
    {
      email,
      rating,
      message,
      type,
      to,
    },
  );
  return response.data;
};

export const getReviewsByEmail = async email => {
  const res = await axios.get(
    `http://192.168.1.17:3000/reviews/getByEmail?email=${email}`,
  );
  return res.data;
};
