'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication for demo purposes
const DEMO_USER = {
  id: 'demo-user-id',
  email: 'admin@tedxviedma.com',
  aud: 'authenticated',
  role: 'authenticated',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
} as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage (demo purposes)
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('tedx-admin-logged-in');
      if (isLoggedIn === 'true') {
        setUser(DEMO_USER);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Demo authentication - accept specific credentials
      if (email === 'admin@tedxviedma.com' && password === 'admin123') {
        localStorage.setItem('tedx-admin-logged-in', 'true');
        setUser(DEMO_USER);
        return {};
      } else {
        return { error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      return { error: 'Error inesperado al iniciar sesión' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('tedx-admin-logged-in');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}