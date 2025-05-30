import axios from 'axios';

const API_URL = 'http://192.168.1.32:3000/workshop';

const createWorkshop = async workshopData => {
  const response = await axios.post(`${API_URL}/create`, workshopData);
  return response.data;
};

const getWorkshopsByAdmin = async adminEmail => {
  const response = await axios.get(`${API_URL}/admin-workshop/${adminEmail}`);
  return response.data;
};

const getWorkshopsByCrafter = async email => {
  const res = await axios.get(`${API_URL}/crafter-workshop/${email}`);
  return res.data;
};

const getCheckpointsByWorkshopId = async workshopId => {
  const res = await axios.get(`${API_URL}/checkpoints/${workshopId}`);
  return res.data;
};

const updateCheckpointStatus = async (
  adminEmail,
  checkpointName,
  newStatus,
) => {
  const response = await axios.patch(`${API_URL}/checkpoint-status`, {
    adminEmail,
    checkpointName,
    newStatus,
  });
  return response.data;
};

const updateCheckpointOrder = async (adminEmail, checkpoints) => {
  const response = await axios.patch(`${API_URL}/checkpoints-order`, {
    adminEmail,
    checkpoints,
  });
  return response.data;
};

export const updateCrafterStatus = async (
  workshopId,
  crafterEmail,
  newStatus,
) => {
  const res = await axios.put(
    `${API_URL}/update-crafter-status/${workshopId}`,
    {
      crafterEmail,
      newStatus,
    },
  );
  return res.data;
};

const removeCrafterFromWorkshop = async (workshopId, crafterEmail) => {
  const res = await axios.put(`${API_URL}/remove-crafter/${workshopId}`, {
    crafterEmail,
  });
  return res.data;
};

const workshopService = {
  createWorkshop,
  getWorkshopsByAdmin,
  getWorkshopsByCrafter,
  getCheckpointsByWorkshopId,
  updateCheckpointOrder,
  updateCheckpointStatus,
  updateCrafterStatus,
  removeCrafterFromWorkshop,
};

export default workshopService;
