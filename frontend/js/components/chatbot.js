// chatbot.js
// Widget de chat para interactuar con MUSA

import { sendMessageToMusa, sendMessageToMusaStream } from '../api/ai.api.js';

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

  // Indicador de 'Musa está escribiendo'
  const typingEl = document.createElement('div');
  typingEl.className = 'musa-typing';
  typingEl.style.display = 'none';
  typingEl.setAttribute('role', 'status');
  typingEl.setAttribute('aria-live', 'polite');
  typingEl.setAttribute('aria-hidden', 'true');
  typingEl.innerHTML = '<span class="musa-typing-text">Musa está escribiendo</span> <span class="musa-dots"><span></span><span></span><span></span></span>';
  chatBox.appendChild(typingEl);

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
    return msg;
  }

  // Efecto de tipeo: escribe el texto en el elemento de destino progresivamente
  function typeTextIntoElement(element, text, speed = 20) {
    return new Promise(resolve => {
      let i = 0;
      element.textContent = '';
      const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  function showTyping() {
    typingEl.style.display = 'flex';
    typingEl.setAttribute('aria-hidden', 'false');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function hideTyping() {
    typingEl.style.display = 'none';
    typingEl.setAttribute('aria-hidden', 'true');
  }

  // Evento enviar mensaje
  sendBtn.addEventListener('click', async () => {
    const userMsg = input.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    input.value = '';

    // Crear mensaje de MUSA vacío que iremos rellenando
    const musaMsgEl = addMessage('', 'musa');

    // Mostrar indicador de escritura
    showTyping();

    // Intentar recibir en streaming; onChunk recibirá fragmentos de texto
    try {
      const result = await sendMessageToMusaStream(userMsg, chunk => {
        // Si el servidor envía chunks, los pegamos directamente (stream real)
        musaMsgEl.textContent += chunk;
        chatBox.scrollTop = chatBox.scrollHeight;
      });

      if (!result.stream) {
        // No hubo streaming real: aplicar efecto de escritura progresiva como fallback
        await typeTextIntoElement(musaMsgEl, result.text, 18);
      }
      // Ocultar indicador cuando la respuesta terminó de mostrarse
      hideTyping();
      // Si hubo streaming real, el texto ya fue mostrado por chunks
    } catch (err) {
      // Ocultar indicador antes de intentar fallback
      hideTyping();
      // Si algo falla con streaming, intentar la ruta clásica y hacer typing
      try {
        showTyping();
        const full = await sendMessageToMusa(userMsg);
        await typeTextIntoElement(musaMsgEl, full, 18);
        hideTyping();
      } catch (e) {
        hideTyping();
        musaMsgEl.textContent = 'Error: ' + (e.message || 'Error en MUSA');
      }
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
