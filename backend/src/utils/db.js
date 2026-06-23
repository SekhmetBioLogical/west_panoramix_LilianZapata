// src/utils/db.js
const fs = require('fs');
const DB_PATH = './users.json';

const readUsers = () => {
    try {
        if (!fs.existsSync(DB_PATH)) return [];
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '[]');
    } catch (error) { return []; }
};

const writeUsers = (users) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };