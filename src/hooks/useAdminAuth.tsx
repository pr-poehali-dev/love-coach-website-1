import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { adminApi, ApiError } from '@/utils/api';
import type { MeResponse } from '@/types/admin';

interface AdminAuthState {
  user: MeResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface AdminAuthContextValue extends AdminAuthState {
  login: (username: string, password: string) => Promise<{ mfa_required?: boolean; mfa_token?: string }>;
  verifyTotp: (mfa_token: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  const checkAuth = async () => {
    try {
      const user = await adminApi.auth.me();
      setState({
        user,
        loading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (username: string, password: string) => {
    const response = await adminApi.auth.login(username, password);
    
    if ('token' in response) {
      await checkAuth();
      return {};
    } else {
      return {
        mfa_required: true,
        mfa_token: response.mfa_token,
      };
    }
  };

  const verifyTotp = async (mfa_token: string, code: string) => {
    await adminApi.auth.verifyTotp(mfa_token, code);
    await checkAuth();
  };

  const logout = async () => {
    try {
      await adminApi.auth.logout();
    } catch (error) {
      // Игнорируем ошибки логаута
    } finally {
      setState({
        user: null,
        loading: false,
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AdminAuthContextValue = {
    ...state,
    login,
    verifyTotp,
    logout,
    checkAuth,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}