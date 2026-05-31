const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// configuracion basica para que el frontend pueda hablar con el back
app.use(cors());
app.use(express.json());

const DB_PATH = './users.json';

// funcion para leer mis usuarios guardados en el json
const readUsers = () => {
    try {
        if (!fs.existsSync(DB_PATH)) return [];
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '[]');
    } catch (error) { return []; }
};

// funcion para guardar los cambios en mi archivo local
const writeUsers = (users) => fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));

// 1. registro de nuevo usuario
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // verifico que no exista ya para no duplicar
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'usuario ya registrado' });
    }

    // creo el nuevo usuario con un id unico simulado
    const newUser = { 
        email, 
        password, 
        id: `SECURE-${Math.random().toString(36).substr(2, 9).toUpperCase()}` 
    };
    users.push(newUser);
    writeUsers(users);
    
    res.status(201).json({ message: 'registro exitoso' });
});

// 2. inicio de sesion
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    // busco si el usuario y pass coinciden
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'credenciales invalidas' });
    }
    
    // si esta todo ok mando el token falso y su correo
    res.status(200).json({ session_token: 'token_seguro_123', email: user.email });
});

// 3. obtener perfil dinamico
app.get('/me', (req, res) => {
    // por ahora traigo el ultimo que se registro para simular el perfil
    const users = readUsers();
    const user = users[users.length - 1]; 
    
    if (!user) return res.status(404).json({ message: 'usuario no encontrado' });
    
    // devuelvo los datos que necesito mostrar en el dashboard
    res.status(200).json({ 
        email: user.email, 
        id: user.id 
    });
});

// levanto el servidor en el puerto 5000
app.listen(5000, () => console.log('servidor en http://localhost:5000'));