import axios from 'axios';

const API_BASE = 'http://192.168.1.18:3000/appointments';

export const createAppointment = async ({userEmail, crafterEmail, date}) => {
  const response = await axios.post(`${API_BASE}/create`, {
    userEmail,
    crafterEmail,
    date,
  });
  return response.data;
};

export const getAppointmentsByEmail = async (email, role = null) => {
  const url = role
    ? `${API_BASE}/${email}?role=${role}`
    : `${API_BASE}/${email}`;
  const response = await axios.get(url);
  return response.data;
};

export const deleteAppointment = async (id, role) => {
  const response = await axios.delete(`${API_BASE}/delete/${id}`, {
    data: {role},
  });
  return response.data;
};

export const getDisabledDates = async crafterEmail => {
  const res = await axios.get(`${API_BASE}/disabledDates/${crafterEmail}`);
  return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await axios.patch(`${API_BASE}/${id}/status`, {status});
  return res.data;
};
