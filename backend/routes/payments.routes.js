const express = require('express');
const router = express.Router();

// Importar el controlador de pagos
const paymentsController = require('../controllers/payments.controller');

// GET /api/payments
router.get('/', paymentsController.getAll);

// GET /api/payments/:id
router.get('/:id', paymentsController.getById);

// POST /api/payments
router.post('/', paymentsController.create);

// PUT /api/payments/:id
router.put('/:id', paymentsController.update);

// DELETE /api/payments/:id
router.delete('/:id', paymentsController.delete);

module.exports = router;