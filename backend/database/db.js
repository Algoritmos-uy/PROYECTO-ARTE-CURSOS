// db.js
// Configura y exporta la conexión a SQLite usando Sequelize

const { Sequelize } = require('sequelize');
const path = require('path');

// Ruta absoluta al archivo de base de datos
const dbPath = path.join(__dirname, 'database.sqlite');

// Instancia de Sequelize para SQLite
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: dbPath,
	logging: false // Desactiva logs de SQL
});

module.exports = sequelize;
