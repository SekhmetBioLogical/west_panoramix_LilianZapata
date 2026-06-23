'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // IMPORTANTE: cambiado por el componente de Next.js
import { apiClient } from '../services/apiClient';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg(''); 

    if (password.length < 6) {
      return setError('la contrasena debe tener al menos 6 caracteres.');
    }

    if (password !== confirmPassword) {
      return setError('las contrasenas no coinciden.');
    }
    
    setIsSubmitting(true);
    try {
      const response = await apiClient.post('/register', { email, password });
      
      if (response.ok) {
        setSuccessMsg('registro exitoso. redirigiendo al login...');
        // en next.js usamos router.push
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(response.data?.message || 'error al registrar.');
      }
    } catch (err) {
      setError('error al conectar con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">crear cuenta</h2>
        <p className="registerSubtitle">ingresa tus datos para registrarte.</p>
        
        <form onSubmit={handleRegister} className="registerForm">
          <div className="registerInputGroup">
            <input 
              type="email" 
              placeholder="correo" 
              className="registerInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="registerInputGroup">
            <input 
              type="password" 
              placeholder="contrasena (min. 6 caracteres)" 
              className="registerInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <div className="registerInputGroup">
            <input 
              type="password" 
              placeholder="confirmar" 
              className="registerInput"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="registerButton"
          >
            {isSubmitting ? 'registrando...' : 'registrarse'}
          </button>
        </form>

        {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
        {successMsg && <p style={{color: 'green', marginTop: '10px'}}>{successMsg}</p>}
        
        <div className="registerLoginLinkContainer">
          {/* enlace corregido para next.js */}
          <Link href="/login" className="registerLoginLink">
            ¿ya tienes cuenta? inicia sesion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;