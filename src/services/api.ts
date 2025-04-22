
import axios from 'axios';
import { FuelLog, FuelLogFormData, User } from '@/lib/types';

// In a real app, this would be an environment variable
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    // In a real app, this would call the actual API
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        const user = { 
          id: '1', 
          name: 'Demo User', 
          email 
        };
        const token = 'mock-jwt-token';
        localStorage.setItem('token', token);
        resolve({ user, token });
      }, 800);
    });
  },
  
  register: async (name: string, email: string, password: string) => {
    // In a real app, this would call the actual API
    return new Promise<{ user: User; token: string }>((resolve) => {
      setTimeout(() => {
        const user = { id: '1', name, email };
        const token = 'mock-jwt-token';
        localStorage.setItem('token', token);
        resolve({ user, token });
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

// Fuel log services
export const fuelLogService = {
  // Get all logs for current user
  getLogs: async (): Promise<FuelLog[]> => {
    // Mock data for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            userId: '1',
            date: '2025-04-18',
            liters: 45,
            pricePerLiter: 1.35,
            totalCost: 60.75,
            vehicleType: 'Sedan',
            notes: 'Regular fill-up'
          },
          {
            id: '2',
            userId: '1',
            date: '2025-04-10',
            liters: 40,
            pricePerLiter: 1.40,
            totalCost: 56.00,
            vehicleType: 'Sedan',
            notes: 'Premium gas'
          },
          {
            id: '3',
            userId: '1',
            date: '2025-04-01',
            liters: 50,
            pricePerLiter: 1.32,
            totalCost: 66.00,
            vehicleType: 'Sedan',
            notes: ''
          }
        ]);
      }, 500);
    });
  },

  // Create a new log
  createLog: async (logData: FuelLogFormData): Promise<FuelLog> => {
    // In a real app, this would call the actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLog = {
          id: Date.now().toString(),
          userId: '1',
          ...logData,
          totalCost: logData.liters * logData.pricePerLiter
        };
        resolve(newLog);
      }, 500);
    });
  },

  // Update existing log
  updateLog: async (id: string, logData: FuelLogFormData): Promise<FuelLog> => {
    // In a real app, this would call the actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedLog = {
          id,
          userId: '1',
          ...logData,
          totalCost: logData.liters * logData.pricePerLiter
        };
        resolve(updatedLog);
      }, 500);
    });
  },

  // Delete a log
  deleteLog: async (id: string): Promise<void> => {
    // In a real app, this would call the actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
};
