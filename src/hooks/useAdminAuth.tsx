// Admin Authentication Hook - Production Ready
// Synchronized with backend API v2

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { adminApi, APIError, ValidationError, handleAPIError, isValidationError } from '@/utils/api';
import type { User, UseAdminAuthReturn } from '@/types/admin';

// ======================================
// Context Definition
// ======================================

const AdminAuthContext = createContext<UseAdminAuthReturn | undefined>(undefined);

// ======================================
// Provider Component
// ======================================

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ======================================
  // Authentication Functions
  // ======================================

  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await adminApi.auth.me();
      
      setUser(response.user);
      setIsAuthenticated(true);
      
    } catch (error) {
      // If authentication fails, clear state
      setUser(null);
      setIsAuthenticated(false);
      
      // Only log errors that aren't 401 (unauthorized)
      if (error instanceof APIError && error.status !== 401) {
        console.error('Auth check error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    username: string, 
    password: string
  ): Promise<{ mfa_required?: boolean; mfa_token?: string }> => {
    try {
      const response = await adminApi.auth.login({ username, password });
      
      // Check if MFA is required
      if ('mfa_required' in response && response.mfa_required) {
        return {
          mfa_required: true,
          mfa_token: response.mfa_token
        };
      } else if ('token' in response) {
        // Login successful without MFA
        setUser(response.user);
        setIsAuthenticated(true);
        return {};
      }
      
      throw new Error('Unexpected login response format');
      
    } catch (error) {
      // Re-throw for component handling
      throw error;
    }
  };

  const verifyTotp = async (mfa_token: string, code: string): Promise<void> => {
    try {
      const response = await adminApi.auth.verifyTotp({ 
        mfa_token, 
        totp_code: code 
      });
      
      setUser(response.user);
      setIsAuthenticated(true);
      
    } catch (error) {
      // Re-throw for component handling
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await adminApi.auth.logout();
    } catch (error) {
      // Log logout errors but don't throw them
      console.error('Logout error:', error);
    } finally {
      // Always clear state on logout, regardless of API response
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear any cached data or tokens
      clearAuthData();
    }
  };

  // ======================================
  // Helper Functions
  // ======================================

  const clearAuthData = (): void => {
    // Clear any localStorage items if used
    try {
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_preferences');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }

    // Clear cookies manually as fallback
    document.cookie = 'workstab_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=; secure; httponly; samesite=lax';
  };

  // ======================================
  // Effects
  // ======================================

  useEffect(() => {
    checkAuth();
  }, []);

  // Auto-refresh token before expiration (if needed)
  useEffect(() => {
    if (!isAuthenticated || !user?.session_expires_at) return;

    const expirationTime = new Date(user.session_expires_at).getTime();
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    
    // Refresh 5 minutes before expiration
    const refreshTime = timeUntilExpiration - (5 * 60 * 1000);

    if (refreshTime > 0) {
      const timeoutId = setTimeout(() => {
        checkAuth(); // This will refresh the session if still valid
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated, user]);

  // ======================================
  // Context Value
  // ======================================

  const contextValue: UseAdminAuthReturn = {
    user,
    loading,
    isAuthenticated,
    login,
    verifyTotp,
    logout,
    checkAuth,
  };

  return (
    <AdminAuthContext.Provider value={contextValue}>
      {children}
    </AdminAuthContext.Provider>
  );
}

// ======================================
// Hook
// ======================================

export function useAdminAuth(): UseAdminAuthReturn {
  const context = useContext(AdminAuthContext);
  
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  
  return context;
}

// ======================================
// Utility Hooks
// ======================================

/**
 * Hook for handling authentication errors
 */
export function useAuthError() {
  const handleError = (error: any): string => {
    if (isValidationError(error)) {
      // Handle validation errors - could show field-specific errors
      return error.message || 'Please check your input and try again.';
    }

    return handleAPIError(error, 'Authentication failed');
  };

  return { handleError };
}

/**
 * Hook for managing login form state
 */
export function useLoginForm() {
  const [step, setStep] = useState<'login' | 'totp'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, verifyTotp } = useAdminAuth();
  const { handleError } = useAuthError();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.mfa_required && result.mfa_token) {
        setMfaToken(result.mfa_token);
        setStep('totp');
      }
      // If no MFA required, auth provider handles the state update
      
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyTotp(mfaToken, totpCode);
      // Success handled by auth provider
      
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const resetToLogin = () => {
    setStep('login');
    setTotpCode('');
    setMfaToken('');
    setError('');
  };

  return {
    step,
    username,
    setUsername,
    password,
    setPassword,
    totpCode,
    setTotpCode,
    loading,
    error,
    handleLogin,
    handleTotp,
    resetToLogin,
  };
}