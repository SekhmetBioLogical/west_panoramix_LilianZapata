// src/middlewares/validateAuth.js
const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('email').isEmail().withMessage('debes ingresar un correo electronico valido'),
    body('password').isLength({ min: 6 }).withMessage('la contrasena debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // si todo esta bien, sigue a la siguiente funcion
    }
];

module.exports = { validateRegister };