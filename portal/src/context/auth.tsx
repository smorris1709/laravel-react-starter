import * as React from 'react';
import { client } from '@/api';
export interface AuthContext {
  isAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const AuthContext = React.createContext<AuthContext | null>(null);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      authStore.getState().logout();
      window.location.assign('/login?session=expired');
    }
    return Promise.reject(error);
  }
);

const key = 'portal.auth.user';

type AuthStore = {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};
const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (user: User) => {
        set({ user });
      },
      logout: async () => {
        set({ user: null });
      },
    }),
    {
      name: 'portal.auth',
    }
  )
);

type User = {
  id: number;
  email: string;
  name: string;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, login, logout } = authStore();
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
