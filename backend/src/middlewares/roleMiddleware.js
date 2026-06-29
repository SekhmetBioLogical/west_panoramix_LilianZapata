// src/middlewares/rolemiddleware.js
// middleware para autorizar el acceso basado en el rol del usuario
const authorizeRole = (role) => {
    return (req, res, next) => {
        // comprobamos si el usuario tiene el rol requerido
        // req.user debe estar definido por el middleware authenticateToken
        if (req.user && req.user.role === role) {
            next();
        } else {
            // retornamos error 403 si el usuario no tiene permisos
            res.status(403).json({ message: "no tienes permisos de gestor para esta accion" });
        }
    };
};

module.exports = { authorizeRole };