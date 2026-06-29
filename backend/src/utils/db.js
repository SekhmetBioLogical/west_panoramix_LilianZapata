// src/utils/db.js
const fs = require('fs');
const DB_PATH = './users.json';

// funcion para leer la lista de usuarios desde el archivo json
const readUsers = () => {
    try {
        // verificamos si el archivo existe para evitar errores
        if (!fs.existsSync(DB_PATH)) return [];
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '[]');
    } catch (error) { 
        // en caso de error, retornamos una lista vacia por seguridad
        return []; 
    }
};

// funcion para guardar la lista de usuarios en el archivo json
const writeUsers = (users) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };