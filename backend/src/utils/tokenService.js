const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

// genera un token firmado con los datos del usuario y una expiracion de 1 hora
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email 
        }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    );
};

// verifica que el token sea autentico usando la clave secreta
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };