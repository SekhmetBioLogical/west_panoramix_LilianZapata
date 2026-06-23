// src/utils/tokenService.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// funcion para generar un token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
    );
};

// funcion para verificar un token
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };