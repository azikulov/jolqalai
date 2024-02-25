import axios from 'axios';

const apiClient = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    const parsedToken = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsedToken.access}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await apiClient.post('/refresh');
        localStorage.setItem('token', JSON.stringify(response.data));

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('[JolQalai] Пользователь не авторизован!');
        throw refreshError;
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
