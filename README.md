*Proyecto West Panoramix - Sistema de Gestión de Eventos*
----------------------------------------------------------
Este repositorio contiene la solución completa para la productora West Panoramix, permitiendo a las empresas registrar, visualizar y gestionar eventos de forma eficiente. El sistema consta de una interfaz moderna en React (Next.js) y un servidor API REST en Node.js/Express.

Características del Sistema
[x] Autenticación Segura: Registro y login con encriptación (bcrypt) y gestión de tokens.

[x] Gestión de Eventos (CRUD): Registro, visualización y actualización de estados.

[x] Validación Robusta: Validación de datos en tiempo real (frontend) y validación estricta en servidor (backend).

[x] Filtrado Avanzado: Sistema de filtrado por estados (Pendiente, Iniciado, Finalizado).

[x] Interfaz Dinámica: Uso de formularios, listados y controles interactivos (selects y radio buttons).

[x] Persistencia: Almacenamiento de datos local en formato JSON (data/events.json y data/users.json).

Requisitos Previos
Node.js instalado en tu equipo.

Gestor de paquetes npm.

Instrucciones de Ejecución
1. Servidor Backend
Abre una terminal y navega a la carpeta del backend:

    cd backend
    npm install
    node server.js

El servidor estará activo en http://localhost:5000

2. Frontend (Interfaz)
Abre una segunda terminal y navega a la carpeta del frontend:

        cd frontend
        npm install
        npm run dev

La aplicación estará disponible en la URL indicada (usualmente http://localhost:3000 o http://localhost:5173).

Estructura del Proyecto
/root
├── backend/
│   ├── src/
│   │   ├── routes/      # Lógica de endpoints (authRoutes, eventRoutes)
│   │   └── utils/       # Gestión de base de datos JSON
│   └── server.js        # Punto de entrada del servidor
├── frontend/
│   ├── src/
│   │   ├── app/         # Páginas y vistas (Next.js)
│   │   ├── components/  # Componentes (Eventos.jsx, AuthForm)
│   │   └── services/    # Cliente de API centralizado
└── data/                # Almacenamiento local (JSON)

Tecnologías Utilizadas
Frontend: React, Next.js, CSS.

Backend: Node.js, Express.js.

Seguridad: BCrypt para encriptación de contraseñas.

Base de Datos: Simulación de persistencia mediante archivos JSON.
