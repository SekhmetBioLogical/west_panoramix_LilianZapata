*Proyecto West Panoramix - Bio-Logical Auth System*
-------------------------------------------------
Este repositorio contiene la implementación del sistema de autenticación para la productora West Panoramix, integrando una interfaz en React con un backend en Node.js/Express.

Cómo iniciar el proyecto
Para ejecutar la aplicación, debes levantar tanto el servidor de backend como el cliente de frontend.

1. Backend (Servidor)
Abre una terminal (ctrl + ñ) y navega a la carpeta del backend:
- Bash: cd backend

Instala las dependencias:
- Bash: npm install

Inicia el servidor:
- Bash: node server.js

El servidor estará disponible en http://localhost:5000

2. Frontend (Interfaz)
Abre una segunda terminal (ctrl + ñ) y navega a la carpeta del frontend:
- Bash: cd frontend

Instala las dependencias:
- Bash: npm install

Inicia la aplicación:
- Bash: npm run dev
La aplicación estará disponible en la URL que indique Vite (http://localhost:5173 en este caso)

Características implementadas
-----------------------------
[x] Registro de usuarios con validación de formularios.

[x] Inicio de sesión con persistencia de token (session_token).

[x] Dashboard protegido con visualización de perfil dinámico.

[x] Cierre de sesión y limpieza de estado.

[x] Base de datos local mediante users.json.