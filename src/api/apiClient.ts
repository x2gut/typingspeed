import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;