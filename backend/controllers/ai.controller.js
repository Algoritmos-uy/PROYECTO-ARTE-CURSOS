// ai.controller.js
// Controlador para manejar la interacción con el chatbot DeepSeek

const { sendMessageToDeepSeek } = require('../services/deepseek.service');

/**
 * Recibe el mensaje del usuario y devuelve la respuesta del modelo DeepSeek.
 * @param {Request} req
 * @param {Response} res
 */
async function handleChat(req, res) {
	const { message } = req.body;
	if (!message) {
		return res.status(400).json({ error: 'Falta el mensaje en el body.' });
	}
	try {
		const aiResponse = await sendMessageToDeepSeek(message);
		res.status(200).json({ response: aiResponse });
	} catch (error) {
		res.status(500).json({ error: 'Error en el servicio de IA.' });
	}
}

module.exports = {
	handleChat
};
