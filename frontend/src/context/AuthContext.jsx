'use client';
import React, { createContext } from 'react';
// importamos los valores desde el hook de autenticacion
import { useAuthValues } from '../hooks/useAuth';

// creamos el contexto para compartir la sesion en toda la aplicacion
export const AuthContext = createContext(null);

// componente proveedor que envuelve la aplicacion con el estado de auth
export const AuthProvider = ({ children }) => {
  // conectamos el motor de estados de forma limpia
  const authState = useAuthValues(); 

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};