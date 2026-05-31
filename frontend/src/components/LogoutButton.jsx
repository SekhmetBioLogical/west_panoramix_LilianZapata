import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // ejecuto la funcion de cierre de sesion
    logout();
    // redirijo al usuario a la pantalla de login
    navigate('/login');
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