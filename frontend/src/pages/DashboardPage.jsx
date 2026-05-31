import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from '../components/LogoutButton';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  // si el usuario no ha cargado, muestro mensaje de espera
  if (!user) {
    return <div className="dashLayout"><p style={{color: 'white', padding: '2rem'}}>cargando...</p></div>;
  }

  return (
    <div className="dashLayout">
      <nav className="dashNavbar">
        <h2>bio-logical app</h2>
        <LogoutButton />
      </nav>

      <main className="dashMain">
        <header className="dashHeader">
          {/* saludo inicial */}
          <div>
            <h1>hola</h1>
            <p>bienvenido a tu panel de gestion tecnica.</p>
          </div>
        </header>

        <section className="dashGrid">
          {/* tarjeta con informacion del perfil */}
          <div className="dashCard">
            <h3>perfil de usuario</h3>
            <p className="dashValue">{user.email}</p>
          </div>
          
          {/* tarjeta con estado de la sesion y id */}
          <div className="dashCard">
            <h3>estado de seguridad</h3>
            <p className="dashValue active">● sesion activa</p>
            {user.id && <small className="dashCodeText">id: {user.id}</small>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;