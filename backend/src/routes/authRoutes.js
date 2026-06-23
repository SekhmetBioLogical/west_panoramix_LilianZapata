// src/routes/authroutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { readUsers, writeUsers } = require('../utils/db');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateRegister } = require('../middlewares/validateAuth');
// importamos el servicio centralizado de tokens
const { generateToken } = require('../utils/tokenService'); 

// ruta para registrar un nuevo usuario
router.post('/register', validateRegister, async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // verificamos si el usuario ya existe en nuestra base de datos
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'usuario ya registrado' });
    }

    // encriptamos la contrasena antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creamos el objeto de usuario con id generado
    const newUser = { 
        email, 
        password: hashedPassword, 
        id: `SECURE-${Math.random().toString(36).substr(2, 9).toUpperCase()}` 
    };
    
    users.push(newUser);
    writeUsers(users);
    
    res.status(201).json({ message: 'registro exitoso' });
});

// ruta para iniciar sesion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // buscamos al usuario por correo
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'credenciales invalidas' });
    }
    
    // comparamos la contrasena ingresada con el hash guardado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'credenciales invalidas' });
    }
    
    // generamos el token usando el servicio centralizado
    const token = generateToken(user);
    
    res.status(200).json({ session_token: token, email: user.email });
});

// ruta protegida para obtener perfil
router.get('/me', authenticateToken, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) return res.status(404).json({ message: 'usuario no encontrado' });
    
    res.status(200).json({ email: user.email, id: user.id });
});

module.exports = router;