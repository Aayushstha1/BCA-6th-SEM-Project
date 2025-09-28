import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const apiService = {
  // Get hello message from backend
  getHello: async () => {
    try {
      const response = await api.get('/hello/');
      return response.data;
    } catch (error) {
      console.error('Error fetching hello message:', error);
      throw error;
    }
  },

  // Get API info
  getApiInfo: async () => {
    try {
      const response = await api.get('/info/');
      return response.data;
    } catch (error) {
      console.error('Error fetching API info:', error);
      throw error;
    }
  },
};

export default api;
