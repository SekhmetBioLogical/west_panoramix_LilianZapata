import React, { useState } from 'react';
// importamos la funcion de validacion de correos
import { validateEmail } from '../utils/validation'; 
import './AuthForm.css';

const AuthForm = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [validationError, setValidationError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // limpio el error si el usuario empieza a escribir
    if (validationError) setValidationError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // limpio el error si el usuario empieza a escribir
    if (validationError) setValidationError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // valido que ningun campo este vacio
    if (!email.trim() || !password.trim()) {
      setValidationError('todos los campos son obligatorios.');
      return;
    }

    // uso la funcion externa para validar el formato del correo
    if (!validateEmail(email)) {
      setValidationError('por favor, ingresa un correo institucional valido.');
      return;
    }

    // si todo esta correcto, envio los datos a la funcion padre
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleFormSubmit} className="authForm">
      {/* campo de correo */}
      <div className="authInputGroup">
        <label htmlFor="emailInput" className="authLabel">correo electronico</label>
        <input
          id="emailInput"
          type="email"
          placeholder="lili.zapata@duocuc.cl"
          value={email}
          onChange={handleEmailChange}
          disabled={isLoading}
          className={`authInput ${validationError && !email ? 'error' : ''}`}
          required
        />
      </div>

      {/* campo de contraseña */}
      <div className="authInputGroup" style={{ marginTop: '16px' }}>
        <label htmlFor="passwordInput" className="authLabel">contraseña</label>
        <input
          id="passwordInput"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          disabled={isLoading}
          className={`authInput ${validationError && !password ? 'error' : ''}`}
          required
        />
      </div>

      {/* mensaje de error si la validacion falla */}
      {validationError && <p className="authErrorText" style={{ marginTop: '12px' }}>{validationError}</p>}

      {/* boton de envio */}
      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="authButton"
        style={{ backgroundColor: '#2563eb', marginTop: '24px' }}
      >
        {isLoading ? 'autenticando...' : 'ingresar'}
      </button>
    </form>
  );
};

export default AuthForm;