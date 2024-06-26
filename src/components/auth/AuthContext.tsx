// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import config from '../../assets/path/config';

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
    axios.get(`${config.API_URL}/api/auth/status`, { withCredentials: true })
      .then(response => {
        if (response.data.isSuccess && response.data.result) {
          setLoginStatus(true, response.data.result.name);
          localStorage.setItem('accessToken', response.data.result.accessToken)
          console.log(localStorage.getItem("accessToken"))
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
