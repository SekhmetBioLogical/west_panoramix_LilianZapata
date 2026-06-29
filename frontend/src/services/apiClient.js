const BASE_URL = 'http://localhost:5000';

// cliente para peticiones http con manejo automatico de auth y url
const apiClient = {
  request: async (endpoint, options = {}) => {
    // gestion automatica del prefijo del endpoint
    let finalUrl = endpoint;
    if (!endpoint.startsWith('/api')) {
      if (endpoint.includes('auth') || endpoint === '/me' || endpoint === '/login' || endpoint === '/register' || endpoint === '/google' || endpoint === '/update-role') {
        finalUrl = `/api/auth${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
      } else {
        finalUrl = `/api/eventos${endpoint === '/eventos' ? '' : (endpoint.startsWith('/') ? '' : '/') + endpoint}`;
      }
    }

    const url = `${BASE_URL}${finalUrl}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    // configuracion de cabeceras incluyendo el token bearer
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `bearer ${token}` } : {}),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, data };
    } catch (error) {
      return { ok: false, status: 500, data: { message: 'error de conexion' } };
    }
  },

  // metodos abreviados para peticiones http
  get: (endpoint, options = {}) => apiClient.request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => apiClient.request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => apiClient.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => apiClient.request(endpoint, { ...options, method: 'DELETE' }),
};

export { apiClient };