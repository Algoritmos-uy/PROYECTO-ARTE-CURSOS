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
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: message }]
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
