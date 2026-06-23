import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { auth } from './firebase';      
import { apiClient } from './apiClient';

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  if (response.ok && response.data?.session_token) {
    localStorage.setItem('authToken', response.data.session_token);
  }
  return response;
};

export const register = async (email, password) => {
  return await apiClient.post('/auth/register', { email, password });
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    const response = await apiClient.post('/auth/google', { token: idToken });
    
    if (response.ok) {
      localStorage.setItem('authToken', response.data.session_token);
    }
    return { ok: true, user: result.user };
  } catch (error) {
    return { ok: false, message: error.message };
  }
};