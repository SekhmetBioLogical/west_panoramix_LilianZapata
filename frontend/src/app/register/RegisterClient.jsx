'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import { apiClient } from '../../services/apiClient';
import './RegisterPage.css';

export default function RegisterClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // maneja el envio del formulario y registro en el backend
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg(''); 

    // validaciones locales basicas
    if (password.length < 6) return setError('la contrasena debe tener al menos 6 caracteres');
    if (password !== confirmPassword) return setError('las contrasenas no coinciden');
    
    setIsSubmitting(true);
    try {
      // peticion post hacia el endpoint de registro
      const response = await apiClient.post('/api/auth/register', { 
        email, 
        password 
      });
      
      setSuccessMsg('registro exitoso. redirigiendo...');
      // guarda rol predeterminado en almacenamiento local
      localStorage.setItem('userRole', 'gestor');
      // redireccion a login tras 2 segundos
      setTimeout(() => router.push('/login'), 2000);
      
    } catch (err) {
      // extrae mensaje de error del backend o usa uno por defecto
      const msg = err.response?.data?.message || 'error al registrarse';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registerContainer">
      <form onSubmit={handleRegister} className="registerForm">
        <h2>crear cuenta</h2>
        {/* campos de formulario */}
        <input 
          type="email" placeholder="correo" value={email}
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="contrasena" value={password}
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <input 
          type="password" placeholder="confirmar" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required 
        />
        
        {/* boton con estado de carga */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'registrando...' : 'registrarse'}
        </button>

        {/* mensajes de feedback al usuario */}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {successMsg && <p style={{color: 'green'}}>{successMsg}</p>}
      </form>
    </div>
  );
}