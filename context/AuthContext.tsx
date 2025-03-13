"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  sessionToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserContext: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("sessionToken") : null
  );

  const updateUserContext = useCallback((userData: User) => {
    setUser(prev => {
      if (!prev || JSON.stringify(prev) !== JSON.stringify(userData)) {
        return userData;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      if (sessionToken) {
        try {
          const response = await axios.get<{ success: boolean; data: User }>(
            `${API_URL}/get_current_user`,
            { headers: { Authorization: sessionToken } }
          );
          
          if (response.data.success) {
            updateUserContext(response.data.data);
          }
        } catch (error) {
          localStorage.removeItem("sessionToken");
          setSessionToken(null);
        }
      }
    };

    initializeAuth();
  }, [sessionToken, updateUserContext]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{
        success: boolean;
        session_token: string;
        user: User;
      }>(`${API_URL}/login`, { email, password });

      if (response.data.success) {
        updateUserContext(response.data.user);
        setSessionToken(response.data.session_token);
        localStorage.setItem("sessionToken", response.data.session_token);
      }
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setSessionToken(null);
    localStorage.removeItem("sessionToken");
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        sessionToken, 
        login, 
        logout, 
        isAuthenticated,
        updateUserContext 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};