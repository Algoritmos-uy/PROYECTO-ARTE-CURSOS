// ai.api.js
// API para enviar mensajes al chatbot MUSA

/**
 * Envía un mensaje al endpoint /api/ai y retorna la respuesta de MUSA.
 * @param {string} message Mensaje del usuario
 * @returns {Promise<string>} Respuesta de MUSA
 */
export async function sendMessageToMusa(message) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  if (data.response) {
    return data.response;
  } else {
    throw new Error(data.error || 'Error en el chatbot MUSA');
  }
}
