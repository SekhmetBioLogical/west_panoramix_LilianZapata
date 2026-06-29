'use client';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import { getUserData } from '../services/userService';
import { auth } from '../services/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuthValues = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // escucha cambios de auth en firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({ name: firebaseUser.displayName, email: firebaseUser.email, isCloudUser: true });
        setLoading(false);
      } else {
        await checkLocalSession();
      }
    });
    return () => unsubscribe();
  }, []);

  const checkLocalSession = async () => {
    // valida token en localstorage
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const result = await getUserData();
        if (result.ok) setUser(result.data);
        else { localStorage.removeItem('authToken'); setUser(null); }
      } catch { setUser(null); }
    } else { setUser(null); }
    setLoading(false);
  };

  const login = async (email, password) => {
    // gestiona inicio de sesion local
    setLoading(true);
    const result = await apiLogin(email, password);
    if (result.ok) {
      const profile = await getUserData();
      if (profile.ok) setUser(profile.data);
      setLoading(false);
      return { success: true };
    }
    setError(result.data?.message || 'error al iniciar sesion');
    setLoading(false);
    return { success: false };
  };

  const register = async (email, password) => {
    // gestiona registro
    setLoading(true);
    const result = await apiRegister(email, password);
    setLoading(false);
    return { success: result.ok, message: result.data?.message };
  };

  const logout = async () => {
    // cierra sesion y limpia estado
    localStorage.removeItem('authToken');
    await signOut(auth).catch(() => {});
    setUser(null);
  };

  return { user, loading, error, login, register, logout };
};

export const useAuth = () => {
  // permite usar el contexto en componentes
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useauth debe usarse dentro de authprovider');
  }
  return context;
};