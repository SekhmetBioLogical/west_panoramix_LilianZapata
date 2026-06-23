'use client';
import React, { useState } from 'react';
import { validateEmail } from '../utils/validation'; 
import './AuthForm.css';

const AuthForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [validationError, setValidationError] = useState('');

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
      
      {/* --- AQUÍ ESTABAN LOS CAMPOS FALTANTES --- */}
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

      <div className="authInputGroup" style={{ marginTop: '16px' }}>
        <label className="authLabel">contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="authInput"
          required
        />
      </div>
      {/* ------------------------------------------ */}

      {validationError && <p className="authErrorText" style={{color: 'red', marginTop: '10px'}}>{validationError}</p>}

      <button type="submit" disabled={isLoading} className="authButton" style={{ marginTop: '20px' }}>
        {isLoading ? 'procesando...' : (isRegistering ? 'registrarse' : 'ingresar')}
      </button>

      <p style={{ marginTop: '15px', cursor: 'pointer', textAlign: 'center', color: '#60a5fa' }} 
         onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿ya tienes cuenta? ingresa aquí' : '¿no tienes cuenta? regístrate'}
      </p>
    </form>
  );
};

export default AuthForm;