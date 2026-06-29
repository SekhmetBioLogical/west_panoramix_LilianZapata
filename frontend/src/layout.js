// src/app/layout.js
import { AuthProvider } from '../context/AuthContext';

// layout raiz que envuelve a toda la aplicacion
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* envolvemos la aplicacion en el proveedor de autenticacion */}
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}