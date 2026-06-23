'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../../components/LogoutButton';
import Eventos from '../../components/Eventos';
import '../../pages/DashboardPage.css';

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [rol, setRol] = useState('');
  const [panelActivo, setPanelActivo] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedRol = localStorage.getItem('userRole') || 'gestor';
    setRol(storedRol);
    setMounted(true);
  }, []);

  if (loading || !mounted) {
    return <div className="dashLayout"><p style={{ color: 'white', padding: '2rem' }}>cargando...</p></div>;
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
        <select 
          value={rol} 
          onChange={(e) => handleRolChange(e.target.value)} 
          style={{ padding: '8px', marginLeft: '20px', cursor: 'pointer' }}
        >
          <option value="gestor">modo: gestión</option>
          <option value="tecnico">modo: técnico</option>
        </select>
        <LogoutButton />
      </nav>

      <main className="dashMain">
        <header className="dashHeader">
          <h1>hola, {userName}</h1>
          <p>panel de {rol === 'tecnico' ? 'producción técnica' : 'gestión logística'}</p>
        </header>

        {panelActivo ? (
          <section className="dashDetailView" style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', color: '#1e293b' }}>
            <button onClick={() => setPanelActivo(null)} style={{ marginBottom: '20px', cursor: 'pointer' }}>← volver al panel</button>
            
            {panelActivo === 'planificador' ? (
              <Eventos />
            ) : (
              <div>
                <h2>consola técnica</h2>
                <p>aquí controlo luces y audio.</p>
              </div>
            )}
          </section>
        ) : (
          <section className="dashGrid">
            {rol === 'gestor' ? (
              <div className="dashCard" style={{ border: '2px solid #10b981' }}>
                <h3>módulo de gestión</h3>
                <button className="dashButton" onClick={() => setPanelActivo('planificador')}>abrir planificador</button>
              </div>
            ) : (
              <div className="dashCard" style={{ border: '2px solid #3b82f6', backgroundColor: '#eff6ff', color: '#1e293b' }}>
                <h3 style={{ color: '#1e293b' }}>consola técnica</h3>
                <button className="dashButton" onClick={() => setPanelActivo('consola')}>iniciar consola</button>
              </div>
            )}
            <div className="dashCard">
              <h3>estado de seguridad</h3>
              <p>● sesión activa</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;