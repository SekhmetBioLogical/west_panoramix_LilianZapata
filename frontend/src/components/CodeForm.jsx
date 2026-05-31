import React, { useState } from 'react';
import './CodeForm.css';

const CodeForm = ({ onSubmit, isLoading }) => {
  const [code, setCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    // permitimos solo numeros y un maximo de 8 caracteres
    if (/^\d*$/.test(value) && value.length <= 8) {
      setCode(value);
      setValidationError('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // validamos que tenga el largo exacto de 8 digitos
    if (code.length !== 8) {
      setValidationError('el codigo debe tener exactamente 8 digitos.');
      return;
    }
    onSubmit(code);
  };

  return (
    <form onSubmit={handleFormSubmit} className="codeForm">
      <div className="codeInputGroup">
        <label htmlFor="securityCode" className="codeLabel">codigo de acceso</label>
        <input
          id="securityCode"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="00000000"
          value={code}
          onChange={handleInputChange}
          disabled={isLoading && code.length === 8} 
          className={`codeInput ${validationError ? 'error' : ''}`}
          autoFocus
          required
        />
        {/* mensaje de error si no tiene los 8 digitos */}
        {validationError && <p className="codeErrorText">{validationError}</p>}
      </div>

      <button
        type="submit"
        // el boton solo se activa al completar los 8 digitos
        disabled={isLoading || code.length !== 8}
        className="codeButton"
        style={{ backgroundColor: isLoading || code.length !== 8 ? '#9ca3af' : '#2563eb' }}
      >
        {isLoading ? 'verificando...' : 'confirmar codigo'}
      </button>
    </form>
  );
};

export default CodeForm;