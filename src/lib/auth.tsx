import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authApi } from './api';

interface User {
  id: string;
  email: string;
  display_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('tracevault_token');
      if (!token) {
        // Auto-login in demo mode
        try {
          const userData = await authApi.getMe();
          setUser(userData);
          localStorage.setItem('tracevault_token', 'demo-token');
        } catch {
          // Not logged in, that's fine
        }
        setLoading(false);
        return;
      }

      try {
        const userData = await authApi.getMe();
        setUser(userData);
      } catch {
        localStorage.removeItem('tracevault_token');
        localStorage.removeItem('tracevault_refresh');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const { user: userData, session } = await authApi.login(email, password);
      if (session?.access_token) {
        localStorage.setItem('tracevault_token', session.access_token);
        if (session.refresh_token) {
          localStorage.setItem('tracevault_refresh', session.refresh_token);
        }
      }
      setUser({
        id: userData.id,
        email: userData.email || email,
        display_name: userData.user_metadata?.display_name || email.split('@')[0],
        role: 'user'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name?: string) => {
    setError(null);
    try {
      const { user: userData, session } = await authApi.signup(email, password, name);
      if (session?.access_token) {
        localStorage.setItem('tracevault_token', session.access_token);
        if (session.refresh_token) {
          localStorage.setItem('tracevault_refresh', session.refresh_token);
        }
      }
      setUser({
        id: userData.id,
        email: userData.email || email,
        display_name: name || email.split('@')[0],
        role: 'user'
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout errors
    }
    localStorage.removeItem('tracevault_token');
    localStorage.removeItem('tracevault_refresh');
    setUser(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        error,
        clearError,
      }}
    >
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
