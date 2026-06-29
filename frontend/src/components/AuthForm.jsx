'use client';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validation'; 
import './AuthForm.css';

const AuthForm = ({ onSubmit, isLoading }) => {
  // estados para manejar las entradas del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  
  // estado para alternar entre los modos de registro o ingreso
  const [isRegistering, setIsRegistering] = useState(false);
  
  // estado para almacenar errores de validacion local
  const [validationError, setValidationError] = useState('');

  // funcion para manejar el envio del formulario con validaciones previas
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setValidationError('todos los campos son obligatorios.');
      return;
    }
    if (!validateEmail(email)) {
      setValidationError('por favor, ingresa un correo institucional valido.');
      return;
    }
    onSubmit(email, password, isRegistering); 
  };

  return (
    <form onSubmit={handleFormSubmit} className="authForm">
      
      {/* grupo de entrada para el correo electronico */}
      <div className="authInputGroup">
        <label className="authLabel">correo electronico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="authInput"
          required
        />
      </div>

      {/* grupo de entrada para la contrasena */}
      <div className="authInputGroup" style={{ marginTop: '16px' }}>
        <label className="authLabel">contrasena</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="authInput"
          required
        />
      </div>

      {/* visualizacion de errores de validacion local */}
      {validationError && <p className="authErrorText" style={{color: 'red', marginTop: '10px'}}>{validationError}</p>}

      {/* boton de envio del formulario */}
      <button type="submit" disabled={isLoading} className="authButton" style={{ marginTop: '20px' }}>
        {isLoading ? 'procesando...' : (isRegistering ? 'registrarse' : 'ingresar')}
      </button>

      {/* toggle para alternar entre modo ingreso y registro */}
      <p style={{ marginTop: '15px', cursor: 'pointer', textAlign: 'center', color: '#60a5fa' }} 
         onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿ya tienes cuenta? ingresa aqui' : '¿no tienes cuenta? registrate'}
      </p>
    </form>
  );
};

export default AuthForm;