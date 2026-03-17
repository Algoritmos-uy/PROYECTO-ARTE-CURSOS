// chatbot.js
// Widget de chat para interactuar con MUSA

import { sendMessageToMusa } from '../api/ai.api.js';

/**
 * Crea el widget de chat MUSA y lo inserta en el DOM.
 */
export function createMusaChatbot() {
  // Crear elementos
  const container = document.createElement('div');
  container.className = 'musa-chatbot';

  const title = document.createElement('h3');
  title.textContent = 'MUSA - Asistente IA';

  const chatBox = document.createElement('div');
  chatBox.className = 'musa-chatbox';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe tu mensaje...';

  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Enviar';

  // Función para agregar mensajes al chat
  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'musa-user-msg' : 'musa-musa-msg';
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Evento enviar mensaje
  sendBtn.addEventListener('click', async () => {
    const userMsg = input.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    input.value = '';
    try {
      const musaReply = await sendMessageToMusa(userMsg);
      // MUSA se autorefiera en femenino
      addMessage(musaReply, 'musa');
    } catch (err) {
      addMessage('Error: ' + err.message, 'musa');
    }
  });

  // Enter para enviar
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.click();
  });

  // Botón cerrar
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.className = 'musa-close-btn';
  closeBtn.addEventListener('click', () => {
    container.remove();
    // Mostrar el launcher nuevamente si existe
    const launcher = document.querySelector('.musa-launcher');
    if (launcher) launcher.style.display = 'block';
  });

  // Estructura
  container.appendChild(title);
  container.appendChild(chatBox);
  container.appendChild(input);
  container.appendChild(sendBtn);
  container.appendChild(closeBtn);

  // Insertar en el body
  document.body.appendChild(container);
}
