import axios from 'axios';

const API_URL = 'http://192.168.1.14:3000/templates';

export const createTemplate = async templateData => {
  const response = await axios.post(API_URL, templateData);
  return response.data;
};

export const getAllTemplates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTemplatesByCrafter = async crafterEmail => {
  const response = await axios.get(`${API_URL}/crafter/${crafterEmail}`);
  return response.data;
};

export const deleteTemplate = async id => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateTemplate = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const uploadImage = async file => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data.imageUrl;
};

export const fetchSortedTemplates = async () => {
  const response = await axios.get(`${API_URL}/sorted`);
  return response.data;
};

export const fetchRecommendedTemplates = async email => {
  const response = await axios.get(`${API_URL}/recommended/${email}`);
  return response.data;
};

export const extractColorsFromImage = async imageUrl => {
  const res = await fetch(`${API_URL}/extract-colors`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({imageUrl}),
  });
  const data = await res.json();
  return data.colors || [];
};

export const generateFromImage = async imageUrl => {
  const res = await fetch(`${API_URL}/generate-description`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({imageUrl}),
  });
  const data = await res.json();
  return data;
};

export const importTemplatesFromProfile = async (profileUrl, email) => {
  const res = await axios.post(`${API_URL}/profile`, {profileUrl, email});
  return res.data;
};
