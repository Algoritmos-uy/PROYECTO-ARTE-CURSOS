// products.routes.js
// Rutas CRUD de productos

const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

// Obtener todos los productos
router.get('/', productsController.getAll);

// Obtener producto por ID
router.get('/:id', productsController.getById);

// Crear producto
router.post('/', productsController.create);

// Actualizar producto
router.put('/:id', productsController.update);

// Eliminar producto
router.delete('/:id', productsController.delete);

module.exports = router;
