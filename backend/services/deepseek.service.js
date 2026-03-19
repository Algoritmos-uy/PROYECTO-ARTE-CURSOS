// deepseek.service.js
// Servicio para comunicarse exclusivamente con la API de DeepSeek

const axios = require('axios');
require('dotenv').config();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

/**
 * Envía un mensaje a la API de DeepSeek y retorna la respuesta del modelo.
 * @param {string} message Mensaje del usuario
 * @returns {Promise<string>} Respuesta del modelo
 */
async function sendMessageToDeepSeek(message) {
  try {
    // Prompt estricto para Musa
    const strictPrompt = `Eres Musa, una asistente IA femenina de la plataforma de arte aplicada. Solo puedes responder preguntas sobre el contenido de la aplicación, productos, técnicas empleadas y cursos. No respondas nada fuera de esos temas. Siempre debes referirte a ti misma en femenino y como Musa. Si te preguntan algo fuera de esos temas, responde amablemente que solo puedes ayudar sobre la plataforma, productos, técnicas y cursos.`;
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: strictPrompt },
          { role: 'user', content: message }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Extrae la respuesta del modelo
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error comunicando con DeepSeek:', error);
    throw new Error('Error en el servicio de IA');
  }
}

module.exports = {
  sendMessageToDeepSeek
};
