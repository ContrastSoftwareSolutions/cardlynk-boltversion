import api from './api';
import type { Profile } from '../types';

export const profileService = {
  async getProfile(id: string) {
    const { data } = await api.get<Profile>(`/profiles/${id}`);
    return data;
  },

  async updateProfile(id: string, updates: Partial<Profile>) {
    const { data } = await api.patch<Profile>(`/profiles/${id}`, updates);
    return data;
  },

  async uploadAvatar(id: string, file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await api.post(`/profiles/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }
};