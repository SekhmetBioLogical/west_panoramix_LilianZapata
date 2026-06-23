'use client';
import { AuthProvider } from '../context/AuthContext';

// el layout envuelve toda la aplicacion
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}