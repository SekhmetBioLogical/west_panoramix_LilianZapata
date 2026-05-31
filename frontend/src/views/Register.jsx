import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // funcion para validar el formato del correo
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // valido que los campos no esten vacios
    if (!email.trim() || !password.trim()) {
      setError('todos los campos son obligatorios.');
      return;
    }

    // valido el formato del correo
    if (!validateEmail(email)) {
      setError('por favor, ingresa un correo electronico valido.');
      return;
    }

    try {
      const data = await authService.register(email, password);
      // guardo el token de seguridad
      localStorage.setItem('auth_token', data.token);
      setSuccess('registro exitoso. redirigiendo al login...');
      
      // redirijo tras 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>registro - west panoramix</h2>
      
      {/* mensajes de estado */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>correo electronico:</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          registrarse
        </button>
      </form>
      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        ya tienes cuenta? <Link to="/login">inicia sesion aqui</Link>
      </p>
    </div>
  );
};