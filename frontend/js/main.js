// main.js
// Inicializa la app SPA y el launcher de MUSA

import { renderNavbar } from './components/navbar.js';
import { onRouteChange, getCurrentPage } from './utils/router.js';
import { renderHome } from './pages/home.js';
import { renderShop } from './pages/shop.js';
import { createMusaLauncher } from './components/chatbotLauncher.js';

const appContainer = document.getElementById('app');
const navbarContainer = document.getElementById('navbar');

function renderPage() {
  const page = getCurrentPage();
  switch (page) {
    case 'home':
      renderHome(appContainer);
      break;
    case 'shop':
      renderShop(appContainer);
      break;
    // Agrega más casos para otras páginas
    default:
      renderHome(appContainer);
  }
}

renderNavbar(navbarContainer);
renderPage();
onRouteChange(renderPage);
createMusaLauncher();
