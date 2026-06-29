// componente eventos para la gestion y visualizacion
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { apiClient } from '../services/apiClient';
import EventoSkeleton from './EventoSkeleton';
import './Eventos.css';
import { validateEvent } from '../utils/validation';

const Eventos = ({ rolActual }) => {

  // estados para la lista de eventos, carga y errores
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  // estados para filtros de estado y productora
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroProductora, setFiltroProductora] = useState('todas');

  // estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [productora, setProductora] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [pais, setPais] = useState('Chile');
  const [ciudad, setCiudad] = useState('Santiago');

  // funcion para obtener eventos desde la api
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

  // logica de filtrado dinamico basada en estado y productora
  const eventosFiltrados = useMemo(() => {
    return eventos.filter(e => {
      const matchEstado = filtroEstado === 'todos' || e.estado === filtroEstado;
      const matchProductora = filtroProductora === 'todas' || e.productora === filtroProductora;
      return matchEstado && matchProductora;
    });
  }, [eventos, filtroEstado, filtroProductora]);

  // obtiene una lista unica de productoras para el filtro
  const listaProductoras = useMemo(() => {
    const unicas = new Set(eventos.map(e => e.productora).filter(Boolean));
    return Array.from(unicas);
  }, [eventos]);

  // carga inicial de eventos
  useEffect(() => {
    fetchEventos();
  }, [rolActual, fetchEventos]);

  // funcion para agregar un nuevo evento con validaciones
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

  // actualiza el estado de un evento existente
  const handleActualizarEstado = async (id, nuevoEstado) => {
    if (rolActual !== 'gestor') return;
    const response = await apiClient.put(`/api/eventos/${id}`, { estado: nuevoEstado });
    if (response.ok) await fetchEventos();
  };

  // renderiza el skeleton mientras carga la informacion
  if (cargando) return <EventoSkeleton />;

  return (
    <div className="dashCard">
      <h2>gestion de eventos</h2>
      
      {/* panel de filtros visual */}
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
      
      {/* formulario para gestores */}
      {rolActual === 'gestor' && (
        <div className="eventos-form" style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', color: '#666' }}>nombre del evento</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: festival de verano" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="contacto@empresa.com" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>direccion</label>
          <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="av. siempre viva 123" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>productora</label>
          <input value={productora} onChange={e => setProductora(e.target.value)} placeholder="west panoramix" />
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>fecha de inicio</label>
              <input type="datetime-local" onChange={e => setFechaInicio(e.target.value)} value={fechaInicio} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>fecha de termino</label>
              <input type="datetime-local" onChange={e => setFechaTermino(e.target.value)} value={fechaTermino} />
            </div>
          </div>
          
          <button onClick={handleAgregar} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', cursor: 'pointer' }}>
            registrar evento
          </button>
        </div>
      )}

      {/* grilla de eventos filtrados */}
      <div className="eventos-grid">
        {eventosFiltrados.map(e => (
          <div key={e.id} className="evento-item" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
            <h3>{e.nombre}</h3>
            
            <p><strong>registrado el:</strong> {e.fechaRegistro ? new Date(e.fechaRegistro).toLocaleString('es-CL', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            }) : 'no disponible'}</p>
            
            <p><strong>fecha inicio:</strong> {e.fechaInicio ? new Date(e.fechaInicio).toLocaleString('es-CL', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            }) : 'n/a'}</p>
            
            <p><strong>fecha termino:</strong> {e.fechaTermino ? new Date(e.fechaTermino).toLocaleString('es-CL', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            }) : 'n/a'}</p>
            
            <p><strong>productora:</strong> {e.productora}</p>
            
            {rolActual === 'gestor' ? (
              <div style={{ marginTop: '10px' }}>
                <label><strong>estado: </strong></label>
                <select value={e.estado} onChange={(ev) => handleActualizarEstado(e.id, ev.target.value)}>
                  <option value="pendiente">pendiente</option>
                  <option value="iniciado">iniciado</option>
                  <option value="en proceso">en proceso</option>
                  <option value="finalizado">finalizado</option>
                </select>
              </div>
            ) : (
              <p><strong>estado:</strong> {e.estado}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;