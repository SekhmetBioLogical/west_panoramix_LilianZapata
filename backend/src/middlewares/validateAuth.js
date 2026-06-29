// src/middlewares/validateauth.js
const { body, validationResult } = require('express-validator');

// middleware para validar los campos del registro de usuario
const validateRegister = [
    body('email').isEmail().withMessage('debes ingresar un correo electronico valido'),
    body('password').isLength({ min: 6 }).withMessage('la contrasena debe tener al menos 6 caracteres'),
    (req, res, next) => {
        // comprobamos si existen errores de validacion
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // retornamos los errores encontrados con un codigo 400
            return res.status(400).json({ errors: errors.array() });
        }
        // si todo esta bien, permitimos el paso a la siguiente funcion
        next(); 
    }
];

module.exports = { validateRegister };