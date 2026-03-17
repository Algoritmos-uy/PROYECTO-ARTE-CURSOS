
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

/**
 * Endpoint para el chatbot: recibe mensaje y responde usando DeepSeek
 * POST /api/ai
 * Body: { message: "texto del usuario" }
 */
router.post('/', aiController.handleChat);

module.exports = router;