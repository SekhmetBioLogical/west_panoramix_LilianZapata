import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm'; 
import './LoginPage.css'; 

const LoginPage = () => {
  const { user, login, loading, error } = useAuth();
  const navigate = useNavigate();

  // si el usuario ya inicio sesion, lo llevo al dashboard
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleLoginSubmit = async (email, password) => {
    // ejecuto el login usando la funcion del hook
    const result = await login(email, password);
    // si el login es exitoso, redirecciono
    if (result.success) {
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2 className="loginTitle">iniciar sesion</h2>
        
        {/* formulario de autenticacion */}
        <AuthForm onSubmit={handleLoginSubmit} isLoading={loading} />
        
        {/* mensaje de error si algo falla */}
        {error && <div className="loginErrorBox" style={{color: 'red'}}>{error}</div>}
        
        {/* enlace para registro */}
        <Link to="/register">no tienes cuenta? registrate</Link>
      </div>
    </div>
  );
};

export default LoginPage;