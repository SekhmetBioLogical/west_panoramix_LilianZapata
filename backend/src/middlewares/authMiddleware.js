// src/middlewares/authmiddleware.js
const { verifyToken } = require('../utils/tokenService');

// middleware para proteger rutas verificando el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // si no hay token, rechazamos la peticion
    if (!token) return res.status(401).json({ message: 'acceso denegado' });

    try {
        // usamos el servicio centralizado para verificar el token
        req.user = verifyToken(token);
        next();
    } catch (error) {
        // si el token es invalido o expiró
        return res.status(403).json({ message: 'token invalido' });
    }
};

module.exports = { authenticateToken };