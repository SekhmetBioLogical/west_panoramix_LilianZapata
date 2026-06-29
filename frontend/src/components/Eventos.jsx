'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { apiClient } from '../services/apiClient';
import EventoSkeleton from './EventoSkeleton';
import './Eventos.css';
import { validateEvent } from '../utils/validation';

const Eventos = ({ rolActual }) => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para filtros
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroProductora, setFiltroProductora] = useState('todas');

  // Estados para formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [productora, setProductora] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [pais, setPais] = useState('Chile');
  const [ciudad, setCiudad] = useState('Santiago');

  const fetchEventos = useCallback(async () => {
    setCargando(true);
    setError('');
    const response = await apiClient.get('/api/eventos');
    if (response.ok) {
      setEventos(response.data);
    } else {
      setError("error al cargar eventos");
    }
    setCargando(false);
  }, []);

  // Lógica de doble filtro
  const eventosFiltrados = useMemo(() => {
    return eventos.filter(e => {
      const matchEstado = filtroEstado === 'todos' || e.estado === filtroEstado;
      const matchProductora = filtroProductora === 'todas' || e.productora === filtroProductora;
      return matchEstado && matchProductora;
    });
  }, [eventos, filtroEstado, filtroProductora]);

  // Extraer productoras únicas para el filtro
  const listaProductoras = useMemo(() => {
    const unicas = new Set(eventos.map(e => e.productora).filter(Boolean));
    return Array.from(unicas);
  }, [eventos]);

  useEffect(() => {
    fetchEventos();
  }, [rolActual, fetchEventos]);

  const handleAgregar = async () => {
    if (rolActual !== 'gestor') return;

    const fechaRegistro = new Date().toISOString();

    const nuevoEvento = { 
      nombre, email, direccion, productora, fechaInicio, fechaTermino, pais, ciudad, estado: 'pendiente', 
      fechaRegistro 
    };

    const validacion = validateEvent(nuevoEvento);
    if (!validacion.isValid) {
      setError(validacion.message);
      return;
    }

    const response = await apiClient.post('/api/eventos', nuevoEvento);
    if (response.ok) {
      setNombre(''); setEmail(''); setDireccion(''); setProductora('');
      setFechaInicio(''); setFechaTermino('');
      setError('');
      await fetchEventos();
    } else {
      setError("error al registrar: " + (response.data.message || "campos incompletos"));
    }
  };

  const handleActualizarEstado = async (id, nuevoEstado) => {
    if (rolActual !== 'gestor') return;
    const response = await apiClient.put(`/api/eventos/${id}`, { estado: nuevoEstado });
    if (response.ok) await fetchEventos();
  };

  if (cargando) return <EventoSkeleton />;

  return (
    <div className="dashCard">
      <h2>gestion de eventos</h2>
      
      {/* Panel de Filtros */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <div>
          <label><strong>Estado: </strong></label>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="iniciado">Iniciado</option>
            <option value="en proceso">En proceso</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
        <div>
          <label><strong>Productora: </strong></label>
          <select value={filtroProductora} onChange={(e) => setFiltroProductora(e.target.value)}>
            <option value="todas">Todas</option>
            {listaProductoras.map(prod => <option key={prod} value={prod}>{prod}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}
      
      {/* Formulario de registro */}
      {rolActual === 'gestor' && (
        <div className="eventos-form" style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', color: '#666' }}>Nombre del evento</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: festival de verano" />
          <label style={{ fontSize: '11px', color: '#666' }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="contacto@empresa.com" />
          <label style={{ fontSize: '11px', color: '#666' }}>Dirección</label>
          <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="av. siempre viva 123" />
          <label style={{ fontSize: '11px', color: '#666' }}>Productora</label>
          <input value={productora} onChange={e => setProductora(e.target.value)} placeholder="west panoramix" />
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Fecha de Inicio</label>
              <input type="date" onChange={e => setFechaInicio(e.target.value)} value={fechaInicio} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Fecha de Término</label>
              <input type="date" onChange={e => setFechaTermino(e.target.value)} value={fechaTermino} />
            </div>
          </div>
          <button onClick={handleAgregar} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', cursor: 'pointer' }}>
            Registrar Evento
          </button>
        </div>
      )}

      {/* Lista de eventos */}
      <div className="eventos-grid">
        {eventosFiltrados.map(e => (
          <div key={e.id} className="evento-item" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
            <h3>{e.nombre}</h3>
            <p><strong>Registrado el:</strong> {e.fechaRegistro ? new Date(e.fechaRegistro).toLocaleString('es-CL', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            }) : 'No disponible'}</p>
            <p><strong>Fecha Inicio:</strong> {e.fechaInicio ? new Date(e.fechaInicio).toLocaleDateString('es-CL') : 'N/A'}</p>
            <p><strong>Fecha Término:</strong> {e.fechaTermino ? new Date(e.fechaTermino).toLocaleDateString('es-CL') : 'N/A'}</p>
            <p><strong>Productora:</strong> {e.productora}</p>
            {rolActual === 'gestor' ? (
              <div style={{ marginTop: '10px' }}>
                <label><strong>Estado: </strong></label>
                <select value={e.estado} onChange={(ev) => handleActualizarEstado(e.id, ev.target.value)}>
                  <option value="pendiente">pendiente</option>
                  <option value="iniciado">iniciado</option>
                  <option value="en proceso">en proceso</option>
                  <option value="finalizado">finalizado</option>
                </select>
              </div>
            ) : (
              <p><strong>Estado:</strong> {e.estado}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;