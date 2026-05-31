import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    // si no hay mensaje, no hago nada
    if (!message) return;
    
    // configuro el temporizador para cerrar el mensaje automaticamente
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    // limpio el temporizador al desmontar
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  // si no hay mensaje, no renderizo nada
  if (!message) return null;

  return (
    <div className={`toastBase ${type}`}>
      {/* icono de estado */}
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