const express = require('express');
const router = express.Router();

// Importar el controlador de cursos
const coursesController = require('../controllers/courses.controller');

// GET /api/courses
router.get('/', coursesController.getAll);

// GET /api/courses/:id
router.get('/:id', coursesController.getById);

// POST /api/courses
router.post('/', coursesController.create);

// PUT /api/courses/:id
router.put('/:id', coursesController.update);

// DELETE /api/courses/:id
router.delete('/:id', coursesController.delete);

module.exports = router;