*Proyecto West Panoramix - Sistema de Gestión de Eventos*
---------------------------------------------------------
Este proyecto es una solución integral para la productora internacional West Panoramix, diseñada para la gestión logística y técnica de eventos. Implementa técnicas avanzadas de optimización y renderizado para cumplir con estándares de alto desempeño.

🚀 Características y Optimizaciones (S6)
-----------------------------------------
Renderizado SSR & Modularización: Implementación de next/dynamic para la carga diferida (lazy loading) de componentes pesados, optimizando el rendimiento de la aplicación.

Retroalimentación Visual (Skeletons): Carga de datos con componentes de tipo Skeleton y espera simulada de 3 segundos para mejorar la experiencia de usuario durante la carga.

Validación de Datos: Validación robusta en el frontend (campos vacíos, formato de correo, alfanuméricos en dirección) mediante utilidades dedicadas.

Persistencia: Gestión de datos centralizada mediante una API REST local y almacenamiento en formato JSON.

Gestión de Roles: Sistema de control de acceso funcional (Gestor/Técnico) con visualización diferenciada de estados.

🛠 Tecnologías Utilizadas
Frontend: React, Next.js (App Router), CSS modularizado.

Backend: Node.js, Express.js.

Seguridad: Autenticación vía JWT y BCrypt para encriptación.

Optimización: next/dynamic para modularización y lazy loading.

📋 Instrucciones de Ejecución
1. Servidor Backend
Navega a la carpeta /backend:

        Bash
        cd backend
        npm install
        node server.js
        El servidor estará activo en http://localhost:5000.

2. Frontend
Navega a la carpeta /frontend:

        Bash
        cd frontend
        npm install
        npm run dev
        La aplicación estará disponible en http://localhost:3000.

📂 Estructura del Proyecto
Plaintext
/root
├── backend/            # API REST en Node.js/Express
├── frontend/           # Interfaz en Next.js
│   ├── src/
│   │   ├── app/        # Vistas (Dashboard, Login, Register)
│   │   ├── components/ # Componentes (Eventos, Skeletons, Auth)
│   │   └── utils/      # Validaciones y servicios
└── data/               # Persistencia de datos local (JSON)
