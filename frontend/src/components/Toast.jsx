'use client';
import React, { useEffect } from 'react';
import './Toast.css';

// componente para mostrar notificaciones flotantes temporales
const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  // efecto para gestionar el cierre automatico del toast
  useEffect(() => {
    if (!message) return;
    
    // temporizador para cerrar el toast tras el tiempo definido
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    // limpieza del temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  // no renderizamos nada si no hay mensaje presente
  if (!message) return null;

  return (
    <div className={`toastBase ${type}`}>
      {/* icono dinamico segun el tipo de aviso */}
      <span className="toastIcon">
        {type === 'error' ? '!' : 'v'}
      </span>
      
      {/* cuerpo del texto con el mensaje */}
      <p className="toastText">{message}</p>
      
      {/* control para cierre manual del usuario */}
      <button className="toastCloseButton" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default Toast;