import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isAuthenticated: false,
  login: async () => {},
  logout: () => {}
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if the user was previously authenticated
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    // When isAuthenticated changes, update localStorage
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
  
      const user = userData.find((userDataItem: { username: string }) => userDataItem.username === username);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const storedEmail = user.username;
      const storedPassword = user.password;
  
      if (username === storedEmail && password === storedPassword) {
        setIsAuthenticated(true);
      } 
      else {
        throw new Error('Invalid username or password');
      } 
    } 
    catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
