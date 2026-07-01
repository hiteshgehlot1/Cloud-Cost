import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const calculateCost = async (data) => {
  const response = await api.post('/calculate', data);
  return response.data;
};

export const savePlan = async (data) => {
  const response = await api.post('/plans', data);
  return response.data;
};

export const getPlans = async () => {
  const response = await api.get('/plans');
  return response.data;
};

export const deletePlan = async (id) => {
  const response = await api.delete(`/plans/${id}`);
  return response.data;
};
