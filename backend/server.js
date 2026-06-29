require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./src/routes/eventRoutes');
const authRoutes = require('./src/routes/authRoutes');

// configuracion de middlewares para peticiones json y cors
app.use(cors());
app.use(express.json());

// rutas del servidor para autenticacion y eventos
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventRoutes);

console.log("Rutas cargadas: /api/auth y /api/eventos");
// inicializacion del servidor en el puerto configurado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`servidor en http://localhost:${PORT}`));