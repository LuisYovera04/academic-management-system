import axios from "axios";

// Base URL for the backend API
const API_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  // 1. Fetch all students
  getAll: async () => {
    const response = await apiClient.get('/students');
    return response.data.data;
  },
  
  // 2. Get a single student by ID
  getById: async (id) => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data.data || response.data;
  },

  // 3. Create a new student
  post: async (data) => {
    return apiClient.post('/students', data);
  },

  // 4. Update existing student
  put: async (id, data) => {
    return apiClient.put(`/students/${id}`, data);
  },

  // 5. Delete student (Soft Delete)
  delete: async (id) => {
    return apiClient.delete(`/students/${id}`);
  },

  // 6. DASHBOARD STATISTICS 
  getStatistics: async () => {
    try {
      const response = await apiClient.get('/statistics');
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw error;
    }
  }
};

export default api;