import api from './api';
import type { Profile } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(userData: RegisterData) {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get<Profile>('/auth/me');
    return data;
  },

  async logout() {
    localStorage.removeItem('token');
    await api.post('/auth/logout');
  }
};