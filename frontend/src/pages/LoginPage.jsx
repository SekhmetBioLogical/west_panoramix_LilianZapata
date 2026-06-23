'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { loginWithGoogle } from '../services/authService';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
  const { login, register, loading, error } = useAuth();
  const router = useRouter();

  // funcion para manejar el proceso de autenticacion tradicional
  const handleAuth = async (email, password, isRegistering) => {
    const action = isRegistering ? register : login;
    const result = await action(email, password);
    
    if (result.success || result.ok) {
      router.replace('/welcome');
    }
  };

  // funcion para manejar el ingreso con google
  const handleGoogleClick = async () => {
    const result = await loginWithGoogle();
    if (result.ok) {
      router.replace('/welcome');
    }
  };

  return (
    <div>
      <h1>ingreso / registro</h1>
      
      {/* formulario de autenticacion tradicional */}
      <AuthForm onSubmit={handleAuth} isLoading={loading} />

      {/* boton de ingreso con google */}
      <button 
        type="button" 
        onClick={handleGoogleClick} 
        className="googleButton" 
        style={{ marginTop: '20px', width: '100%', padding: '10px' }}
      >
        ingresar con google
      </button>
      
      {/* mensaje de error si existe */}
      {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
    </div>
  );
};

// exportacion por defecto del componente
export default LoginPage;