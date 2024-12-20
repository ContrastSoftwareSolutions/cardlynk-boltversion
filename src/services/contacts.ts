import api from './api';
import type { Contact } from '../types';

export const contactService = {
  async getContacts() {
    const { data } = await api.get<Contact[]>('/contacts');
    return data;
  },

  async getContact(id: string) {
    const { data } = await api.get<Contact>(`/contacts/${id}`);
    return data;
  },

  async createContact(contact: Partial<Contact>) {
    const { data } = await api.post<Contact>('/contacts', contact);
    return data;
  },

  async updateContact(id: string, updates: Partial<Contact>) {
    const { data } = await api.patch<Contact>(`/contacts/${id}`, updates);
    return data;
  },

  async deleteContact(id: string) {
    await api.delete(`/contacts/${id}`);
  }
};