import { create } from 'zustand';
import type { Profile, Contact } from '../types';
import { authService } from '../services/auth';
import { profileService } from '../services/profile';
import { contactService } from '../services/contacts';

interface State {
  user: Profile | null;
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
}

interface Actions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  getContacts: () => Promise<void>;
  addContact: (contact: Partial<Contact>) => Promise<void>;
  updateContact: (id: string, updates: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

export const useStore = create<State & Actions>((set, get) => ({
  user: null,
  contacts: [],
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await authService.logout();
      set({ user: null, contacts: [], isLoading: false });
    } catch (error) {
      set({ error: 'Logout failed', isLoading: false });
      throw error;
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    try {
      set({ isLoading: true, error: null });
      const user = get().user;
      if (!user?.id) throw new Error('No user found');
      const updatedProfile = await profileService.updateProfile(user.id, updates);
      set({ user: updatedProfile, isLoading: false });
    } catch (error) {
      set({ error: 'Profile update failed', isLoading: false });
      throw error;
    }
  },

  getContacts: async () => {
    try {
      set({ isLoading: true, error: null });
      const contacts = await contactService.getContacts();
      set({ contacts, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch contacts', isLoading: false });
      throw error;
    }
  },

  addContact: async (contact: Partial<Contact>) => {
    try {
      set({ isLoading: true, error: null });
      const newContact = await contactService.createContact(contact);
      set(state => ({ 
        contacts: [...state.contacts, newContact],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to add contact', isLoading: false });
      throw error;
    }
  },

  updateContact: async (id: string, updates: Partial<Contact>) => {
    try {
      set({ isLoading: true, error: null });
      const updatedContact = await contactService.updateContact(id, updates);
      set(state => ({
        contacts: state.contacts.map(c => c.id === id ? updatedContact : c),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update contact', isLoading: false });
      throw error;
    }
  },

  deleteContact: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await contactService.deleteContact(id);
      set(state => ({
        contacts: state.contacts.filter(c => c.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete contact', isLoading: false });
      throw error;
    }
  }
}));