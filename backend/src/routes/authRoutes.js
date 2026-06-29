const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const { readUsers, writeUsers } = require('../utils/db');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateRegister } = require('../middlewares/validateAuth');
const { generateToken } = require('../utils/tokenService'); 

// 1. registro de usuario nuevo
router.post('/register', validateRegister, async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // verifica si el email ya existe en la base de datos
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'usuario ya registrado' });
    }

    // genera salt y cifra la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // crea nuevo usuario con id aleatorio
    const newUser = { 
        email, 
        password: hashedPassword, 
        id: `SECURE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    
    // guarda usuario y actualiza base de datos
    users.push(newUser);
    writeUsers(users);
    
    res.status(201).json({ message: 'registro exitoso' });
});

// 2. login con correo y contraseña
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // valida existencia del usuario
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'credenciales invalidas' });
    
    // compara contraseña cifrada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'credenciales invalidas' });
    
    // genera token de sesion
    const token = generateToken(user);
    
    res.status(200).json({ 
        session_token: token, 
        email: user.email
    });
});

// 3. autenticacion mediante google
router.post('/google', async (req, res) => {
    const { token } = req.body;
    const users = readUsers();
    
    if (!token) return res.status(400).json({ message: 'token de google faltante' });

    try {
        // decodifica el token de google sin validar firma (se asume validado en frontend)
        const decodedGoogleToken = jwt.decode(token);
        if (!decodedGoogleToken || !decodedGoogleToken.email) {
            return res.status(401).json({ message: 'token de google invalido' });
        }
        
        const email = decodedGoogleToken.email;
        let user = users.find(u => u.email === email);
        
        // registra usuario nuevo si no existe
        if (!user) {
            user = { 
                email: email, 
                password: 'GOOGLE_AUTH_USER_NO_PASSWORD', 
                id: `SECURE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            };
            users.push(user);
            writeUsers(users);
        }
        
        // genera token interno para la sesion
        const sessionToken = generateToken(user);
        
        res.status(200).json({ 
            session_token: sessionToken, 
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'error interno del servidor al procesar google' });
    }
});

// 4. obtencion de perfil mediante token
router.get('/me', authenticateToken, (req, res) => {
    const users = readUsers();
    // busca al usuario segun id extraido del token
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'usuario no encontrado' });
    // retorna datos basicos del usuario
    res.status(200).json({ email: user.email, id: user.id });
});

module.exports = router;