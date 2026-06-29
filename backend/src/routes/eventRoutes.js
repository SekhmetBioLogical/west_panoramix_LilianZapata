const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../middlewares/authmiddleware');

const DB_PATH = path.join(__dirname, '../../data/events.json');

// utilidades de lectura/escritura y sanitizacion
const readEvents = () => fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) : [];
const writeEvents = (events) => fs.writeFileSync(DB_PATH, JSON.stringify(events, null, 2));
const sanitize = (str) => typeof str === 'string' ? str.trim().replace(/[<>]/g, "") : str;

// get: obtiene todos los eventos registrados
router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(readEvents());
});

// post: registra un nuevo evento tras validar campos requeridos
router.post('/', authenticateToken, (req, res) => {
    try {
        const { nombre, email, direccion, productora, fechaInicio, fechaTermino, pais, ciudad, estado } = req.body;

        // verifica que ningun campo este vacio
        if (!nombre || !email || !direccion || !productora || !fechaInicio || !fechaTermino || !pais || !ciudad || !estado) {
            return res.status(400).json({ message: "todos los campos son obligatorios" });
        }

        const events = readEvents();
        // genera id incremental basado en el maximo actual
        const newEvent = { 
            id: events.length > 0 ? Math.max(...events.map(e => Number(e.id))) + 1 : 1,
            nombre: sanitize(nombre),
            email: sanitize(email),
            direccion: sanitize(direccion),
            productora: sanitize(productora),
            fechaInicio,
            fechaTermino,
            fechaRegistro: new Date().toISOString(),
            pais: sanitize(pais),
            ciudad: sanitize(ciudad),
            estado: sanitize(estado)
        };

        // guarda el nuevo evento en el archivo
        events.push(newEvent);
        writeEvents(events);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: "error al guardar evento" });
    }
});

// put: actualiza el estado de un evento existente por id
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    let events = readEvents();
    
    // localiza el indice del evento
    const index = events.findIndex(e => String(e.id) === String(id));
    if (index === -1) return res.status(404).json({ message: 'no encontrado' });

    // actualiza estado y sobreescribe el archivo
    events[index].estado = sanitize(estado);
    writeEvents(events);
    res.status(200).json(events[index]);
});

module.exports = router;