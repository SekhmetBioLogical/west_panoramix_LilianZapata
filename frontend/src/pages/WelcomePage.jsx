'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import './Welcome.css';

const WelcomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [rol, setRol] = useState('gestor');
  const [isNavigating, setIsNavigating] = useState(false);

  // 1. manejo de carga
  if (loading) {
    return <div className="welcome-container">cargando sesion...</div>;
  }

  // 2. si no hay usuario, el protectedroute lo enviara a login
  if (!user) return null;

  const handleConfirm = async () => {
    setIsNavigating(true);
    try {
      // 3. persistencia en localstorage
      localStorage.setItem('userRole', rol);
      console.log("rol guardado exitosamente:", rol);
      
      // 4. navegacion con next/navigation
      router.replace('/dashboard');
    } catch (error) {
      setIsNavigating(false);
      console.error("error critico en la navegacion hacia /dashboard:", error);
      alert("no pudimos ingresar al dashboard. revisa la consola.");
    }
  };

  const nombreParaMostrar = user.name || (user.email ? user.email.split('@')[0] : 'usuario');

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">hola, {nombreParaMostrar}!</h1>
        
        <p className="welcome-text">valida tu acceso. selecciona tu perfil para continuar.</p>

        <div className="setup-wrapper">
          <label>rol principal:</label>
          <select 
            className="welcome-select" 
            value={rol} 
            onChange={(e) => setRol(e.target.value)}
            disabled={isNavigating}
          >
            <option value="gestor">gestor de eventos</option>
            <option value="tecnico">tecnico de produccion</option>
          </select>
        </div>

        <button 
          className="welcome-btn" 
          onClick={handleConfirm}
          disabled={isNavigating}
        >
          {isNavigating ? 'ingresando...' : 'confirmar y entrar'}
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;