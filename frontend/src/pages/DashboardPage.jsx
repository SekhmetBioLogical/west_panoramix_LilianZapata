'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from '../components/LogoutButton';
import Eventos from '../components/Eventos'; 
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  
  const [rol, setRol] = useState('gestor');
  const [panelActivo, setPanelActivo] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') || 'gestor';
    setRol(savedRole);
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return <div className="dashLayout"><p style={{color: 'white', padding: '2rem'}}>cargando dashboard...</p></div>;
  }
  
  if (!user) return null; 

  const userName = user.name || (user.email ? user.email.split('@')[0] : 'usuario');

  const handleRolChange = (newRol) => {
    setRol(newRol);
    setPanelActivo(null);
    localStorage.setItem('userRole', newRol);
  };

  return (
    <div className="dashLayout">
      <nav className="dashNavbar">
        <h2>bio-logical app</h2>
        <select value={rol} onChange={(e) => handleRolChange(e.target.value)}>
          <option value="gestor">modo: gestion</option>
          <option value="tecnico">modo: tecnico</option>
        </select>
        <LogoutButton />
      </nav>

      <main className="dashMain">
        <h1>hola, {userName}</h1>
        {panelActivo === 'planificador' ? (
           <Eventos />
        ) : (
           <button onClick={() => setPanelActivo('planificador')}>abrir planificador</button>
        )}
      </main>
    </div>
  );
}; 

export default DashboardPage;