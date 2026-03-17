// chatbotLauncher.js
// Botón flotante para lanzar el widget de MUSA

import { createMusaChatbot } from './chatbot.js';

/**
 * Crea un botón flotante para abrir el chat de MUSA.
 */
export function createMusaLauncher() {
  const launcher = document.createElement('button');
  launcher.className = 'musa-launcher';
  launcher.textContent = '💬';
  launcher.title = 'Habla con MUSA';

  // Mostrar el chatbot al hacer clic
  launcher.addEventListener('click', () => {
    if (!document.querySelector('.musa-chatbot')) {
      createMusaChatbot();
    }
    launcher.style.display = 'none';
  });

  // Posición flotante
  launcher.style.position = 'fixed';
  launcher.style.bottom = '24px';
  launcher.style.right = '24px';
  launcher.style.zIndex = '1000';
  launcher.style.background = '#fff';
  launcher.style.borderRadius = '50%';
  launcher.style.width = '56px';
  launcher.style.height = '56px';
  launcher.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  launcher.style.fontSize = '2rem';
  launcher.style.cursor = 'pointer';

  document.body.appendChild(launcher);
}
