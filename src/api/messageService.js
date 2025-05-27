import axios from 'axios';

const API_URL = 'http://192.168.1.17:3000/messages';

const getChatMessages = async (sender, receiver) => {
  const response = await axios.get(`${API_URL}/get-chat`, {
    params: {sender, receiver},
  });
  return response.data;
};

const sendMessage = async ({sender, receiver, content}) => {
  const response = await axios.post(`${API_URL}/add-message`, {
    sender,
    receiver,
    content,
  });
  return response.data;
};

const getContacts = async userEmail => {
  const response = await axios.get(`${API_URL}/get-contacts`, {
    params: {userEmail},
  });
  return response.data;
};

const likeMessage = async messageId => {
  const response = await axios.put(`${API_URL}/like/${messageId}`);
  return response.data.message;
};

const deleteMessage = async messageId => {
  const response = await axios.delete(`${API_URL}/delete/${messageId}`);
  return response.data.deleted;
};

const messageService = {
  getChatMessages,
  sendMessage,
  getContacts,
  likeMessage,
  deleteMessage,
};

export default messageService;
