// src/services/userservice.js
import { apiClient } from '../services/apiClient';

// servicio para obtener los datos del usuario autenticado
export const getUserData = async () => {
  // realizo la peticion get al servidor para obtener la info
  // recuerda incluir el prefijo /api/auth para que coincida con la ruta en tu backend
  return await apiClient.get('/api/auth/me');
};