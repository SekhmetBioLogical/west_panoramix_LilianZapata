'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../../components/LogoutButton';
import './DashboardPage.css';
import EventoSkeleton from '../../components/EventoSkeleton';

// Carga diferida del componente eventos (Puntos 4 y 5)
const Eventos = dynamic(() => import('../../components/Eventos'), {
  ssr: true,
  loading: () => <EventoSkeleton /> 
});

const DashboardPage = ({ eventosIniciales }) => {
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
    return <div className="dashLayout"><p style={{ color: 'white', padding: '2rem' }}>Cargando...</p></div>;
  }

  if (!user) return null;

  const userName = user.name || (user.email ? user.email.split('@')[0] : 'usuario');

  return (
    <div className="dashLayout">
      <nav className="dashNavbar">
        <h2>West Panoramix</h2>
        <select value={rol} onChange={(e) => { setRol(e.target.value); localStorage.setItem('userRole', e.target.value); }} style={{ padding: '8px', marginLeft: '20px' }}>
          <option value="gestor">modo: GESTION</option>
          <option value="tecnico">modo: TECNICO</option>
        </select>
        <LogoutButton />
      </nav>

      <main className="dashMain">
        <header className="dashHeader">
          <h1>Hola, {userName}</h1>
          <p>Panel de {rol === 'tecnico' ? 'Producción Técnica' : 'Gestion Logística'}</p>
        </header>

        {panelActivo === 'planificador' ? (
          <section className="dashDetailView" style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px' }}>
            <button onClick={() => setPanelActivo(null)} style={{ marginBottom: '20px', cursor: 'pointer' }}>← volver</button>
            <Eventos rolActual={rol} eventosIniciales={eventosIniciales} />
          </section>
        ) : (
          <section className="dashGrid">
            <div className="dashCard">
              <h3>{rol === 'gestor' ? 'Modulo de Gestión' : 'Consola Técnica'}</h3>
              <button className="dashButton" onClick={() => setPanelActivo('planificador')}>
                {rol === 'gestor' ? 'abrir planificador' : 'ver eventos'}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;