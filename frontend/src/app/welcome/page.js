'use client';
import WelcomePage from '../../pages/WelcomePage';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function WelcomeRoute() {
  return (
    <ProtectedRoute>
      <WelcomePage />
    </ProtectedRoute>
  );
}