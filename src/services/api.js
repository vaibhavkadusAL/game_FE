import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject JWT token if stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('yono_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 and we haven't already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('yono_admin_refresh_token');
      if (refreshToken) {
        try {
          // Attempt to get a new access token
          const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          
          if (res.data.token) {
            localStorage.setItem('yono_admin_token', res.data.token);
            // Update the authorization header for the original request
            originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token is invalid/expired
          localStorage.removeItem('yono_admin_token');
          localStorage.removeItem('yono_admin_refresh_token');
          localStorage.removeItem('yono_admin_user');
          window.location.href = '/admin/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, logout
        localStorage.removeItem('yono_admin_token');
        localStorage.removeItem('yono_admin_user');
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
