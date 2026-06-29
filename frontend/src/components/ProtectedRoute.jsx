'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

// protege rutas privadas verificando la autenticacion del usuario
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // efecto para redirigir al login si no hay sesion activa
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // renderizado condicional mientras verifica el estado de la sesion
  if (loading) return <div>cargando...</div>;
  if (!user) return null;
  
  return <>{children}</>;
}