import api from './api';

const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data; // Expected: { token, refreshToken, username, email, role }
  },
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  resetPassword: async (email, otpCode, newPassword) => {
    const response = await api.post('/auth/reset-password', { email, otpCode, newPassword });
    return response.data;
  },
};

export default authService;
