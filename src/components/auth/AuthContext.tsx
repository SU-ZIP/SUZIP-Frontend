// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  userName: string;
  isLoggedIn: boolean;
  setLoginStatus: (isLoggedIn: boolean, userName?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoginStatus = (loggedIn: boolean, name: string = '') => {
    setIsLoggedIn(loggedIn);
    setUserName(name);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/status", { withCredentials: true })
      .then(response => {
        if (response.data.success && response.data.data) {
          setLoginStatus(true, response.data.data.name);
        } else {
          setLoginStatus(false);
        }
      })
      .catch(() => {
        setLoginStatus(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ userName, isLoggedIn, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
