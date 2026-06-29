'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../services/apiClient';
import EventoSkeleton from './EventoSkeleton';
import './Eventos.css';
import { validateEvent } from '../utils/validation';

const Eventos = ({ rolActual }) => {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

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
    
    // pausa de 3 segundos para mostrar el skeleton
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await apiClient.get('/api/eventos');
    if (response.ok) {
      setEventos(response.data);
    } else {
      setError("error al cargar eventos");
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    fetchEventos();
  }, [rolActual, fetchEventos]);

  // maneja la creacion de un nuevo evento
  const handleAgregar = async () => {
    if (rolActual !== 'gestor') return;

    const nuevoEvento = { 
      nombre, email, direccion, productora, fechaInicio, fechaTermino, pais, ciudad, estado: 'pendiente' 
    };

    // validacion de datos mediante funcion externa
    const validacion = validateEvent(nuevoEvento);
    if (!validacion.isValid) {
      setError(validacion.message);
      return;
    }

    const response = await apiClient.post('/api/eventos', nuevoEvento);
    if (response.ok) {
      // limpia campos tras exito
      setNombre(''); setEmail(''); setDireccion(''); setProductora('');
      setFechaInicio(''); setFechaTermino('');
      setError('');
      await fetchEventos();
    } else {
      setError("error al registrar: " + (response.data.message || "campos incompletos"));
    }
  };

  // actualiza estado de un evento especifico
  const handleActualizarEstado = async (id, nuevoEstado) => {
    if (rolActual !== 'gestor') return;

    const response = await apiClient.put(`/api/eventos/${id}`, { estado: nuevoEstado });
    if (response.ok) {
      await fetchEventos();
    } else {
      setError("no se pudo actualizar el estado");
    }
  };

  if (cargando) return <EventoSkeleton />;

  return (
    <div className="dashCard">
      <h2>gestion de eventos</h2>
      {error && <p className="error-msg" style={{ color: 'red' }}>{error}</p>}
      
      {/* formulario de registro con guias de usuario */}
      {rolActual === 'gestor' && (
        <div className="eventos-form" style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', color: '#666' }}>Nombre del evento</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: festival de verano" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>Email de contacto</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ej: contacto@empresa.com" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>Dirección (minimo 5 caracteres)</label>
          <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="ej: av. siempre viva 123" />
          
          <label style={{ fontSize: '11px', color: '#666' }}>Nombre de Productora</label>
          <input value={productora} onChange={e => setProductora(e.target.value)} placeholder="ej: west panoramix" />
          
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

          <label style={{ fontSize: '11px', color: '#666' }}>Pais</label>
          <input value={pais} onChange={e => setPais(e.target.value)} placeholder="ej: chile" />
          <label style={{ fontSize: '11px', color: '#666' }}>Ciudad</label>
          <input value={ciudad} onChange={e => setCiudad(e.target.value)} placeholder="ej: santiago" />
          
          <button onClick={handleAgregar} style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', cursor: 'pointer' }}>
            Registrar Evento
          </button>
        </div>
      )}

      {/* lista de eventos completa */}
      <div className="eventos-grid">
        {eventos.map(e => (
          <div key={e.id} className="evento-item" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
            <h3>{e.nombre}</h3>
            <p><strong>Ubicación:</strong> {e.ciudad}, {e.pais}</p>
            <p><strong>Productora:</strong> {e.productora}</p>
            <p><strong>Dirección:</strong> {e.direccion}</p>
            <p><strong>Contacto:</strong> {e.email}</p>
            <p><strong>Fecha:</strong> {e.fechaInicio} al {e.fechaTermino}</p>
            
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
              <p><strong>estado:</strong> {e.estado}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;