'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; 
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../../components/LogoutButton';
import './DashboardPage.css';

// carga diferida del componente eventos para optimizar rendimiento
const Eventos = dynamic(() => import('../../components/Eventos'), {
  ssr: false, // evita error con localstorage en servidor
  loading: () => <p>Cargando módulo de eventos...</p> // feedback de carga
});

const DashboardPage = () => {
  const { user, loading } = useAuth();
  const [rol, setRol] = useState('');
  const [panelActivo, setPanelActivo] = useState(null);
  const [mounted, setMounted] = useState(false);

  // carga rol desde localstorage al montar
  useEffect(() => {
    const storedRol = localStorage.getItem('userRole') || 'gestor';
    setRol(storedRol);
    setMounted(true);
  }, []);

  // pantalla de carga mientras verifica sesion
  if (loading || !mounted) {
    return <div className="dashLayout"><p style={{ color: 'white', padding: '2rem' }}>cargando...</p></div>;
  }

  if (!user) return null;

  // obtiene nombre para saludo
  const userName = user.name || (user.email ? user.email.split('@')[0] : 'usuario');

  // actualiza rol y reinicia vista
  const handleRolChange = (newRol) => {
    setRol(newRol);
    setPanelActivo(null);
    localStorage.setItem('userRole', newRol);
  };

  return (
    <div className="dashLayout">
      <nav className="dashNavbar">
        <h2>West Panoramix</h2>
        {/* selector de modo de usuario */}
        <select 
          value={rol} 
          onChange={(e) => handleRolChange(e.target.value)} 
          style={{ padding: '8px', marginLeft: '20px', cursor: 'pointer', borderRadius: '4px' }}
        >
          <option value="gestor">modo: GESTION</option>
          <option value="tecnico">modo: TECNICO</option>
        </select>
        <LogoutButton />
      </nav>
S
      <main className="dashMain">
        <header className="dashHeader">
          <h1>Hola, {userName}</h1>
          <p>Panel de {rol === 'tecnico' ? 'Producción Técnica' : 'Gestion Logística'}</p>
        </header>

        {panelActivo ? (
          // vista detallada con carga dinamica del componente
          <section className="dashDetailView" style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', color: '#1e293b' }}>
            <button onClick={() => setPanelActivo(null)} style={{ marginBottom: '20px', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc' }}>← volver al panel</button>
            
            {panelActivo === 'planificador' ? (
              <Eventos rolActual={rol} />
            ) : (
              <div>
                <h2>Consola Técnica</h2>
                <p>aqui controlo luces y audio.</p>
              </div>
            )}
          </section>
        ) : (
          // grilla principal de seleccion
          <section className="dashGrid">
            {rol === 'gestor' ? (
              <div className="dashCard">
                <h3>Modulo de Gestión</h3>
                <button className="dashButton" onClick={() => setPanelActivo('planificador')}>abrir planificador</button>
              </div>
            ) : (
              <div className="dashCard tecnico">
                <h3>Consola Técnica</h3>
                <button className="dashButton" onClick={() => setPanelActivo('planificador')}>ver eventos</button>
              </div>
            )}
            <div className="dashCard">
              <h3>Estado de Seguridad</h3>
              <p>● sesion activa</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;