'use client';
import React, { useEffect } from 'react';
import './Toast.css';

// funcion para mostrar notificaciones flotantes temporales
const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    // funcion para verificar si hay mensaje
    if (!message) return;
    
    // funcion para configurar el temporizador de cierre automatico
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    // funcion para limpiar el temporizador al desmontar
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  // funcion para evitar renderizado si no hay mensaje
  if (!message) return null;

  return (
    <div className={`toastBase ${type}`}>
      {/* icono segun el tipo de aviso */}
      <span className="toastIcon">
        {type === 'error' ? '!' : 'v'}
      </span>
      
      {/* texto del aviso */}
      <p className="toastText">{message}</p>
      
      {/* boton para cerrar manualmente */}
      <button className="toastCloseButton" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default Toast;