import WelcomeClient from './WelcomeClient';
import ProtectedRoute from '../../components/ProtectedRoute';

// pagina de bienvenida protegida que verifica la sesion del usuario
export default function Page() {
  return (
    <ProtectedRoute>
      <WelcomeClient />
    </ProtectedRoute>
  );
}