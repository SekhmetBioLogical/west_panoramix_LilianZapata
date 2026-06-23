const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/events.json');

// funcion auxiliar para leer y escribir
const readEvents = () => fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) : [];
const writeEvents = (events) => fs.writeFileSync(DB_PATH, JSON.stringify(events, null, 2));

// get: obtener eventos
router.get('/', (req, res) => {
    try {
        res.status(200).json(readEvents());
    } catch (error) {
        res.status(500).json({ message: "error al leer eventos" });
    }
});

// post: crear evento con validacion (Criterio 4)
router.post('/', (req, res) => {
    try {
        const { nombre, email, pais, ciudad, estado } = req.body;

        // validacion de campos requeridos
        if (!nombre || !email || !pais || !ciudad || !estado) {
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }

        // validacion de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "formato de email invalido" });
        }

        const events = readEvents();
        
        // generacion de id correlativo
        const newId = events.length > 0 ? Math.max(...events.map(e => Number(e.id))) + 1 : 1;
        
        const newEvent = { id: newId, ...req.body };
        events.push(newEvent);
        
        writeEvents(events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "error al guardar evento" });
    }
});

// put: actualizar estado
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        let events = readEvents();
        
        const index = events.findIndex(e => String(e.id) === String(id));
        
        if (index === -1) {
            return res.status(404).json({ message: 'evento no encontrado' });
        }

        events[index] = { ...events[index], estado };
        writeEvents(events);
        res.status(200).json(events[index]);
    } catch (error) {
        res.status(500).json({ message: "error al actualizar evento" });
    }
});

module.exports = router;