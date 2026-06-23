// frontend/src/services/apiClient.js

const BASE_URL = 'http://localhost:5000';

export const apiClient = {
  request: async (endpoint, options = {}) => {
    // correccion automatica: si el endpoint no tiene /api, se lo ponemos.
    // esto evita que tus llamadas fallen con 404.
    const apiPath = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
    const url = `${BASE_URL}${apiPath}`;
    
    // validacion para entornos de next.js
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // si existe token, lo agregamos a los headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      // intentamos procesar la respuesta del servidor
      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = { message: text }; 
      }

      // retornamos estado y datos
      return {
        ok: response.ok,
        status: response.status,
        data: data
      };
    } catch (error) {
      console.error('error de conexion con el servidor:', error);
      return { 
        ok: false, 
        status: 500, 
        data: { message: 'no se pudo conectar con el servidor local. verifica que este encendido.' } 
      };
    }
  },

  // obtencion de datos
  get: (endpoint, options = {}) => 
    apiClient.request(endpoint, { ...options, method: 'GET' }),
  
  // creacion de datos
  post: (endpoint, body, options = {}) => 
    apiClient.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
  // actualizacion de datos
  put: (endpoint, body, options = {}) => 
    apiClient.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
  // eliminacion de datos
  delete: (endpoint, options = {}) => 
    apiClient.request(endpoint, { ...options, method: 'DELETE' }),
};