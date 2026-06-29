const { verifyToken } = require('../utils/tokenService');

// middleware para validar el token de autenticacion en los headers
const authenticateToken = (req, res, next) => {
    // obtiene el header de autorizacion
    const authHeader = req.headers.authorization;
    // extrae el token eliminando el prefijo bearer
    const token = authHeader && authHeader.split(' ')[1];

    // retorna error 401 si no se proporciona token
    if (!token) {
        return res.status(401).json({ message: 'acceso denegado: token faltante' });
    }

    try {
        // verifica la validez y firma del token
        const decoded = verifyToken(token);
        
        // asigna los datos del usuario decodificados al objeto de la peticion
        req.user = decoded; 
        
        // continua a la siguiente funcion de middleware o controlador
        next();
    } catch (error) {
        // retorna error 403 si la verificacion falla por vencimiento o invalidez
        return res.status(403).json({ message: 'token invalido o expirado' });
    }
};

module.exports = { authenticateToken };