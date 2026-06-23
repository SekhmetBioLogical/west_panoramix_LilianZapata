'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  // funcion para cerrar sesion y redirigir al login
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <button 
      className="logoutButton" 
      onClick={handleLogout} 
      title="cerrar sesion de forma segura"
    >
      {/* boton simple para salir */}
      <span>salir</span>
    </button>
  );
};

export default LogoutButton;