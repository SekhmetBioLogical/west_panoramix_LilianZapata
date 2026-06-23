require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./src/routes/eventRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(cors());
app.use(express.json());

// server.js
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`servidor en http://localhost:${PORT}`));