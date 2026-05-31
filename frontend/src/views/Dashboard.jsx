import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // elimino el token de forma segura
    localStorage.removeItem('auth_token');
    // redirijo al login
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1>bienvenido al sistema de gestion de eventos</h1>
      <p style={{ color: '#555', fontSize: '1.1em' }}>
        has iniciado sesion con exito en la plataforma de prototipado de <strong>west panoramix</strong>.
      </p>
      <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        cerrar sesion
      </button>
    </div>
  );
};