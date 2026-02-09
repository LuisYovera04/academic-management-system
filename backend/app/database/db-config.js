const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the route of where the db will be saved
const dbPath = path.resolve(__dirname, '../database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado exitosamente a la base de datos SQLite.');
  }
});

module.exports = db;