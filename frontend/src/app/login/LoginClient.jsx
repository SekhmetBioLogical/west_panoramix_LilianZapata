'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { loginWithGoogle } from '../../services/authService';
import AuthForm from '../../components/AuthForm';
import './LoginPage.css'; 

export default function LoginClient() {
  const { login, register, loading, error: authError } = useAuth();
  const [localError, setLocalError] = useState('');
  const router = useRouter();

  // funcion para manejar autenticacion y asignar rol por defecto
  const handleAuth = async (email, password, isRegistering) => {
    setLocalError('');
    try {
      const action = isRegistering ? register : login;
      const result = await action(email, password);
      
      // validacion estricta de la respuesta
      if (result && (result.success || result.ok)) {
        if (!localStorage.getItem('userRole')) {
          localStorage.setItem('userRole', 'gestor');
        }
        router.replace('/welcome');
      }
    } catch (err) {
      console.error("error fatal durante autenticacion:", err);
      setLocalError("error de conexion con el servidor. intentalo mas tarde.");
    }
  };

  // funcion para manejar ingreso con google
  const handleGoogleClick = async () => {
    setLocalError('');
    try {
      const result = await loginWithGoogle();
      if (result && result.ok) {
        if (!localStorage.getItem('userRole')) {
          localStorage.setItem('userRole', 'gestor');
        }
        router.replace('/welcome');
      }
    } catch (err) {
      setLocalError("error al iniciar sesion con google.");
    }
  };

  return (
    <div className="loginPageWrapper">
      <div className="loginCard">
        <h2 className="brandTitle">west panoramix</h2>
        <p className="loginSubtitle">gestion profesional de eventos y produccion.</p>

        <h1 className="loginTitle">ingreso al sistema</h1>
        
        <AuthForm onSubmit={handleAuth} isLoading={loading} />

        <div style={{ margin: '15px 0', color: '#64748b' }}>o</div>

        <button 
          type="button" 
          onClick={handleGoogleClick} 
          className="googleButton" 
          disabled={loading}
        >
          {loading ? 'procesando...' : 'ingresar con google'}
        </button>

        {/* muestra error de autenticacion o error de red */}
        {(authError || localError) && (
          <p className="error-msg" style={{marginTop: '15px'}}>
            {authError || localError}
          </p>
        )}

        <div className="linkContainer">
          <Link href="/register" className="registerLoginLink">
            ¿no tienes cuenta? registrate
          </Link>
        </div>
      </div>
    </div>
  );
}