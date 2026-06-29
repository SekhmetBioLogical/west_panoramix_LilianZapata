'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import './Welcome.css';

export default function WelcomeClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // inicializamos el rol por defecto
  const [rol, setRol] = useState('gestor');
  const [isNavigating, setIsNavigating] = useState(false);

  // indicador visual mientras carga la sesion
  if (loading) {
    return <div className="welcome-container">cargando sesion...</div>;
  }

  if (!user) return null;

  // funcion para confirmar el rol y dirigir al dashboard
  const handleConfirm = async () => {
    setIsNavigating(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userRole', rol);
      }
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

        {/* boton de confirmacion que dispara la navegacion al dashboard */}
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
}