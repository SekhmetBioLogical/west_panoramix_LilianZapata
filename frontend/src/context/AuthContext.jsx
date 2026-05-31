import React, { createContext } from 'react';
// importamos los valores para el proveedor
import { useAuthValues } from '../hooks/useAuth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // conecto el motor de estados de forma limpia
  const authState = useAuthValues(); 

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};