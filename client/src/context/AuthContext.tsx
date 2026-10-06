import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { Admin } from '../types';

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedAdmin = localStorage.getItem('adminData');
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success && response.data) {
      const { admin: adminData, token: authToken } = response.data;
      setAdmin(adminData);
      setToken(authToken);
      localStorage.setItem('adminToken', authToken);
      localStorage.setItem('adminData', JSON.stringify(adminData));
    } else {
      throw new Error(response.message || 'Login failed');
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const response = await api.changePassword(currentPassword, newPassword);
    if (!response.success) {
      throw new Error(response.message || 'Failed to change password');
    }
    if (admin) {
      const updatedAdmin = { ...admin, isFirstLogin: false };
      setAdmin(updatedAdmin);
      localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        login,
        logout,
        changePassword,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};