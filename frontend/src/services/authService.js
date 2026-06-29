// frontend/src/services/authService.js
import { apiClient } from './apiClient';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase';

// gestiona login con credenciales locales
export const login = async (email, password) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  
  // guarda token en almacenamiento local si la autenticacion es correcta
  if (response.ok && response.data?.session_token) {
    localStorage.setItem('authToken', response.data.session_token); 
  }
  return response;
};

// registra usuario nuevo mediante la api
export const register = async (email, password) => {
  return await apiClient.post('http://localhost:5000/api/auth/register', { email, password });
};

// gestiona login mediante proveedor externo google
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    // abre popup de firebase y obtiene token
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    
    // envia token de google al backend para validacion y sesion interna
    const response = await apiClient.post('/api/auth/google', { token: idToken });
    
    if (response.ok && response.data?.session_token) {
      localStorage.setItem('authToken', response.data.session_token);
    }
    return { ok: response.ok, data: response.data, user: result.user };
  } catch (error) {
    // verifica errores especificos de firebase (cancelacion manual)
    if (error.code === 'auth/popup-closed-by-user') {
      console.warn("operacion cancelada: el usuario cerro la ventana de google");
      return { ok: false, message: 'operacion cancelada por el usuario', isCancelled: true };
    }

    // registra errores graves de autenticacion
    console.error("error en loginwithgoogle:", error);
    return { ok: false, message: error.message };
  }
};