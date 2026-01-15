import axios, { AxiosInstance } from 'axios';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const REQUEST_TIMEOUT = parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '10000');
const MAX_RETRIES = parseInt(import.meta.env.VITE_MAX_RETRIES || '3');

// Axios Instance with interceptors
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor: Add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: Handle errors and token refresh
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Attempt to refresh token
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const response = await instance.post('/auth/refresh', { refreshToken });
          localStorage.setItem('token', response.data.token);
          return instance(originalRequest);
        } catch (err) {
          // Refresh failed, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }

      // Handle other errors
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createApiClient();

// API SERVICE FUNCTIONS (ready for real implementation)

export const santriService = {
  // GET /api/santri - List with pagination and filters
  getAll: async (filters?: {
    search?: string;
    class?: string;
    dormitory?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/santri', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching santri list:', error);
      throw error;
    }
  },

  // GET /api/santri/:id - Get detail
  getById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/santri/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching santri ${id}:`, error);
      throw error;
    }
  },

  // POST /api/santri - Create baru
  create: async (data: any) => {
    try {
      const response = await axiosInstance.post('/santri', data);
      return response.data;
    } catch (error) {
      console.error('Error creating santri:', error);
      throw error;
    }
  },

  // PUT /api/santri/:id - Update
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/santri/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating santri ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/santri/:id - Delete
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/santri/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting santri ${id}:`, error);
      throw error;
    }
  },
};

export const attendanceService = {
  // GET /api/attendance - List with filters
  getAll: async (filters?: {
    date?: string;
    class?: string;
    santriId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/attendance', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }
  },

  // GET /api/attendance/statistics - Get stats per santri
  getStatistics: async (filters?: {
    santriId?: string;
    month?: number;
    year?: number;
  }) => {
    try {
      const response = await axiosInstance.get('/attendance/statistics', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance statistics:', error);
      throw error;
    }
  },

  // POST /api/attendance/bulk - Bulk create/update
  createBulk: async (records: any[]) => {
    try {
      const response = await axiosInstance.post('/attendance/bulk', { records });
      return response.data;
    } catch (error) {
      console.error('Error bulk creating attendance:', error);
      throw error;
    }
  },

  // PUT /api/attendance/:id - Update single record
  update: async (id: string, data: any) => {
    try {
      const response = await axiosInstance.put(`/attendance/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating attendance ${id}:`, error);
      throw error;
    }
  },

  // DELETE /api/attendance/:id - Delete single record
  delete: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/attendance/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting attendance ${id}:`, error);
      throw error;
    }
  },
};

export default axiosInstance;