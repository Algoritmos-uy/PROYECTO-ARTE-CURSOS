// navbar.js
// Navbar conectado al router SPA

import { navigate, getCurrentPage } from '../utils/router.js';

/**
 * Renderiza el navbar y conecta enlaces al router
 * @param {HTMLElement} container
 */
export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <ul>
        <li><a href="#/" data-route="/">Inicio</a></li>
        <li><a href="#/shop" data-route="/shop">Tienda</a></li>
        <li><a href="#/courses" data-route="/courses">Cursos</a></li>
        <li><a href="#/payments" data-route="/payments">Pagos</a></li>
        <li><a href="#/contact" data-route="/contact">Contacto</a></li>
        <li><a href="#/register" data-route="/register">Registro</a></li>
      </ul>
    </nav>
  `;
  // Conectar enlaces
  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(link.dataset.route);
    });
  });
}
