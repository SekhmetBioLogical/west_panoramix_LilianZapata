import React from 'react';
import './EventoSkeleton.css';

// componente que muestra un esqueleto visual mientras cargan los datos
const EventoSkeleton = () => {
  return (
    <div className="skeleton-container">
      <h3>cargando eventos...</h3>
      {/* generamos tres elementos de esqueleto para simular la lista */}
      {[1, 2, 3].map((n) => (
        <div key={n} className="skeleton-item">
          {/* el div hijo es el que lleva la clase de la animacion de pulso */}
          <div className="skeleton-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default EventoSkeleton;