import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any; // In a real app, you'd have a proper User type
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  
  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ isAuthenticated: true, token, user });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuthenticated: false, token: null, user: null });
  },
  
  checkAuthStatus: () => {
    const token = localStorage.getItem('token');
    set({ isAuthenticated: !!token, token });
  },
}));