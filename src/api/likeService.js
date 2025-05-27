import axios from 'axios';

export const getUserLikedTemplates = async userEmail => {
  const res = await axios.get(`http://192.168.1.17:3000/likes/${userEmail}`);
  return res.data;
};

export const toggleLike = async (userEmail, templateId) => {
  const res = await axios.post('http://192.168.1.17:3000/likes/toggle', {
    userEmail,
    templateId,
  });
  return res.data;
};
