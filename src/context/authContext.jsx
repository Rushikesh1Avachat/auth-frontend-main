import { useEffect, useState } from 'react';
import { AuthContext } from '../hooks/useAuth';
import { storage } from '../utils/storage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.get('userInfo'));
  const [token, setToken] = useState(
    storage.get('accessToken') // Best Option Not to Store
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(user && token)
  );

  const updateUser = (userData) => {
    storage.set('userInfo', userData);
    setUser(storage.get('userInfo'));
  };

  const login = (data) => {
    // desructuring data
    console.log(data,"from data line 15 context");
    
    const { data: userData, accessToken, refreshToken } = data;
    setUser(userData);
    setToken(accessToken);
    setIsAuthenticated(true);

    updateUser(userData);
    storage.set('accessToken', accessToken);
    storage.set('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    storage.remove('userInfo');
    storage.remove('accessToken');
    storage.remove('refreshToken');
  };

  // Ensure isAuthenticated updates properly
  useEffect(() => {
    setIsAuthenticated(Boolean(user && token));
  }, [user, token]);

  return (
    <AuthContext.Provider
      value={{ login, logout, updateUser, user, token, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
