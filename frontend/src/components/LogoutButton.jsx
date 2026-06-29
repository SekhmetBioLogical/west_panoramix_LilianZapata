'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  // funcion para cerrar sesion, limpiar rol y redirigir al login
  const handleLogout = () => {
    logout();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
    }
    router.push('/login');
  };

  return (
    // boton para cerrar sesion de forma segura
    <button 
      className="logoutButton" 
      onClick={handleLogout} 
      title="cerrar sesion de forma segura"
    >
      {/* texto del boton para salir */}
      <span>salir</span>
    </button>
  );
};

export default LogoutButton;