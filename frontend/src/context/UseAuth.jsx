import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, authenticated_user, register, refresh_token } from '@/api/DataFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const get_authenticated_user = async () => {
    try {
      const user = await authenticated_user();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (phone, password) => {
    try {
      const user = await login(phone, password);
      if (user) {
        setUser(user);
        navigate('/');
        window.location.reload()
        return { success: true };
      } else {
        return { success: false, message: 'Incorrect phone number or password.' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || 'Unknown error occurred during login.' };
    }
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    navigate('/');
  };

  const registerUser = async (first_name, email, password, confirm_password, phone, birthday, gender, address) => {
    try {
      if (password !== confirm_password) {
        return { success: false, message: 'Passwords do not match!' };
      }
      await register(first_name, email, password, confirm_password, phone, birthday, gender, address);
      alert('User successfully registered');
      navigate('/login');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.detail || 'Unknown error occurred during registration.' };
    }
  };

  const refreshToken = async () => {
    try {
      await refresh_token();
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  };

  useEffect(() => {
    get_authenticated_user();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);