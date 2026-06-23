'use client';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';
import './Eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [pais, setPais] = useState('Chile'); // Nuevo
  const [ciudad, setCiudad] = useState('Santiago'); // Nuevo
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('Todos'); // Para Criterio 6

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    const response = await apiClient.get('/eventos');
    if (response.ok) setEventos(response.data);
  };

  const handleAgregar = async () => {
    if (!nombre.trim() || !email.trim()) {
      setError('todos los campos son obligatorios.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('el formato del email no es válido.');
      return;
    }

    const nuevoEvento = { 
      nombre, 
      email, 
      estado, 
      pais, 
      ciudad,
      fechaRegistro: new Date().toLocaleString() // Criterio 4: Fecha automática
    };

    const response = await apiClient.post('/eventos', nuevoEvento);
    if (response.ok) {
      setNombre(''); setEmail(''); setError('');
      await fetchEventos();
    }
  };

  // criterio 6: logica de filtrado
  const eventosFiltrados = filtro === 'Todos' 
    ? eventos 
    : eventos.filter(ev => ev.estado === filtro);

  return (
    <div className="eventos-container">
      <h2>Gestión de Eventos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="eventos-form">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre evento" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email contacto" />
        
        {/* Criterio 2: Listados (select) */}
        <select value={pais} onChange={(e) => setPais(e.target.value)}>
          <option value="Chile">Chile</option><option value="Argentina">Argentina</option>
        </select>
        <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
          <option value="Santiago">Santiago</option><option value="Temuco">Temuco</option>
        </select>

        {/* criterio 2: radio buttons */}
        <div className="radio-group">
          <label><input type="radio" value="Pendiente" checked={estado === 'Pendiente'} onChange={(e) => setEstado(e.target.value)} /> Pendiente</label>
          <label><input type="radio" value="Iniciado" checked={estado === 'Iniciado'} onChange={(e) => setEstado(e.target.value)} /> Iniciado</label>
          <label><input type="radio" value="Finalizado" checked={estado === 'Finalizado'} onChange={(e) => setEstado(e.target.value)} /> Finalizado</label>
        </div>
        <button onClick={handleAgregar}>Registrar</button>
      </div>

      {/* Criterio 6: Botones de filtro */}
      <div className="filtro-group">
        {['Todos', 'Pendiente', 'Iniciado', 'Finalizado'].map(f => (
          <button key={f} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>

      <ul className="eventos-lista">
        {eventosFiltrados.map((ev) => (
          <li key={ev.id}>
            {ev.nombre} ({ev.estado}) - Reg: {ev.fechaRegistro}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Eventos;