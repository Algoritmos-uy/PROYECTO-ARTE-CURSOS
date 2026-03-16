// server.js
// Inicializa el servidor Express, carga variables de entorno, habilita JSON, sirve el frontend y registra rutas API

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Registrar rutas API
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/courses', require('./routes/courses.routes'));
app.use('/api/payments', require('./routes/payments.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/ai', require('./routes/ai.routes'));

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
