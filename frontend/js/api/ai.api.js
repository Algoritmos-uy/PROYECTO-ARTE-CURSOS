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

/**
 * Intenta enviar un mensaje y recibir la respuesta en streaming si el endpoint lo soporta.
 * Llama a onChunk por cada fragmento recibido. Si el servidor responde con JSON
 * sin streaming, retorna { stream: false, text }.
 * @param {string} message
 * @param {(chunk: string)=>void} onChunk
 * @returns {Promise<{stream: boolean, text: string}>}
 */
export async function sendMessageToMusaStream(message, onChunk = () => {}) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream, text/plain, */*'
    },
    body: JSON.stringify({ message })
  });

  const contentType = (res.headers.get('content-type') || '').toLowerCase();

  // Si el servidor devuelve JSON sin streaming, parsear y devolver texto completo
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (data.response) return { stream: false, text: data.response };
    throw new Error(data.error || 'Error en el chatbot MUSA');
  }

  // Si no hay body o no es legible como stream, fallback a JSON path
  if (!res.body || !res.body.getReader) {
    const data = await res.json().catch(() => null);
    if (data && data.response) return { stream: false, text: data.response };
    throw new Error('El endpoint no devuelve contenido legible.');
  }

  // Leer el body como stream y pasar chunks al callback
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let accumulated = '';
  while (!done) {
    const { value, done: d } = await reader.read();
    done = d;
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      accumulated += chunk;
      try {
        onChunk(chunk);
      } catch (err) {
        // Ignorar errores del callback
      }
    }
  }

  return { stream: true, text: accumulated };
}
