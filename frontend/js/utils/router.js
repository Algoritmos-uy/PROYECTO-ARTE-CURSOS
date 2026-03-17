// router.js
// Router SPA simple basado en hash

const routes = {
  '/': 'home',
  '/shop': 'shop',
  '/courses': 'courses',
  '/payments': 'payments',
  '/contact': 'contact',
  '/register': 'register'
};

/**
 * Navega a la ruta y renderiza la página correspondiente
 * @param {string} path
 */
export function navigate(path) {
  window.location.hash = path;
}

/**
 * Obtiene el nombre de la página actual
 * @returns {string}
 */
export function getCurrentPage() {
  const hash = window.location.hash.replace('#', '') || '/';
  return routes[hash] || 'home';
}

/**
 * Registra el callback para cambios de ruta
 * @param {Function} callback
 */
export function onRouteChange(callback) {
  window.addEventListener('hashchange', callback);
}
