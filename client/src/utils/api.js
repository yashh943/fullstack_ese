import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Foolproof check: if the Vercel env variable is missing '/api', add it automatically
if (!API_URL.endsWith('/api') && !API_URL.includes('localhost')) {
  // Strip trailing slash if it exists
  if (API_URL.endsWith('/')) {
    API_URL = API_URL.slice(0, -1);
  }
  API_URL = `${API_URL}/api`;
}

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
