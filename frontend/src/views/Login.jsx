import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // funcion para validar el formato del correo
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // valido que el campo no este vacio
    if (!email.trim()) {
      setError('el correo electronico es obligatorio.');
      return;
    }

    // valido el formato del correo
    if (!validateEmail(email)) {
      setError('formato de correo invalido.');
      return;
    }

    try {
      // llamo al servicio para solicitar el codigo
      await authService.loginStep1(email);
      
      // si todo esta correcto, navego a la verificacion pasando el email
      navigate('/verify', { state: { email: email.trim() } });
    } catch (err) {
      setError(err.message || 'error al solicitar el codigo. verifica tus datos.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>iniciar sesion</h2>
      {/* caja de error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>correo electronico:</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="ejemplo@duocuc.cl"
          />
        </div>
        
        {/* boton de accion */}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          solicitar codigo
        </button>
      </form>
      
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        no tienes cuenta? <Link to="/register">registrate aqui</Link>
      </p>
    </div>
  );
};