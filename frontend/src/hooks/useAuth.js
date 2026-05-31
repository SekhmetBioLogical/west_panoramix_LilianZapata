import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../services/authService';
import { getUserData } from '../services/userService';

export const useAuthValues = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // verificacion de sesion al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const result = await getUserData();
          if (result.ok) {
            setUser(result.data);
          } else {
            // si el token no es valido, lo borro
            localStorage.removeItem('authToken');
          }
        } catch (err) {
          console.error('error al validar sesion:', err);
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  // logica de login
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiLogin(email, password);
      
      if (result.ok) {
        // traigo los datos del usuario tras el login
        const profile = await getUserData();
        if (profile.ok) {
          setUser(profile.data);
          return { success: true };
        }
      }
      
      setError(result.data?.message || 'error al iniciar sesion.');
      return { success: false };
    } catch (err) {
      setError('error de conexion con el servidor.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // logica para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};