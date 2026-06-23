// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}