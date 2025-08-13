import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { 
  User, 
  Skill, 
  UserSkill, 
  LoginRequest, 
  LoginResponse,
  RegisterRequest, 
  RegisterResponse,
  CreateUserSkillRequest, 
  UpdateUserSkillRequest 
} from '../types';

// Configure a base URL - ajuste conforme seu backend
const BASE_URL = 'http://192.168.15.6:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH ENDPOINTS
export const authAPI = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post('/api/auth/cadastro', data);
    return response.data;
  },
};

// USER ENDPOINTS
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },
};

// SKILL ENDPOINTS
export const skillAPI = {
  getAllSkills: async (): Promise<Skill[]> => {
    const response = await api.get('/api/skills');
    return response.data;
  },

  getSkillById: async (id: number): Promise<Skill> => {
    const response = await api.get(`/api/skills/${id}`);
    return response.data;
  },
};

// USER SKILL ENDPOINTS
export const userSkillAPI = {
  getUserSkills: async (): Promise<UserSkill[]> => {
    const response = await api.get('/api/users/skills');
    return response.data;
  },

  createUserSkill: async (data: CreateUserSkillRequest): Promise<UserSkill> => {
    const response = await api.post('/api/users/skills', data);
    return response.data;
  },

  updateUserSkill: async (id: number, data: UpdateUserSkillRequest): Promise<UserSkill> => {
    const response = await api.put(`/api/users/skills/${id}`, data);
    return response.data;
  },

  deleteUserSkill: async (id: number): Promise<void> => {
    await api.delete(`/api/users/skills/${id}`);
  },
};

export default api;
