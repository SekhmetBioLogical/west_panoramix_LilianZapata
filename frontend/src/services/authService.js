import { apiClient } from '../services/apiClient';

/**
 * servicio para iniciar sesion.
 * envia las credenciales y devuelve el token de autenticacion.
 */
export const login = async (email, password) => {
  const response = await apiClient.post('/login', { email, password });
  
  // si el login es exitoso, guardo el token en el almacenamiento local
  if (response.ok && response.data?.session_token) {
    localStorage.setItem('authToken', response.data.session_token);
  }
  
  return response;
};

/**
 * servicio para cerrar sesion.
 */
export const logout = () => {
  // elimino el token para cerrar la sesion
  localStorage.removeItem('authToken');
};