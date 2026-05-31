import { apiClient } from '../services/apiClient';

/**
 * servicio para obtener los datos del usuario autenticado.
 * consulta el endpoint del perfil.
 */
export const getUserData = async () => {
  // realizo la peticion get al servidor para obtener la info
  return await apiClient.get('/me');
};