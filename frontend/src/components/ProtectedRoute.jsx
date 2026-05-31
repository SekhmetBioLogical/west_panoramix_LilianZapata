import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ProtectedRoute.css';

//componente de ruta protegida evita accesos no autorizados al dashboard.
 
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('authToken');

  // mientras se valida la sesion, mostramos mensaje de espera
  if (loading) {
    return (
      <div className="loadingContainer">
        <p className="loadingText">verificando credenciales de seguridad...</p>
      </div>
    );
  }

  // si no hay usuario ni token, redirijo al login
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  // si todo esta correcto, permito ver la pagina protegida
  return children;
};

export default ProtectedRoute;