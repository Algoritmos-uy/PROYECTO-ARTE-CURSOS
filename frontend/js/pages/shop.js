// shop.js
// Página de tienda: obtiene y renderiza productos

import { renderProducts } from '../render/renderProducts.js';
import { getProducts } from '../api/products.api.js';

/**
 * Renderiza la sección de tienda
 * @param {HTMLElement} container
 */

/**
 * Renderiza la página de tienda SPA
 * @param {HTMLElement} container
 */
import { renderCart, getCart } from '../components/cart.js';

/**
 * Renderiza la sección de tienda (HTML base) y luego carga productos dinámicamente.
 * Muestra estados: loading, error y vacío.
 * @param {HTMLElement} container - Contenedor principal de la tienda
 */
export function renderShop(container) {
  // HTML base de la tienda
  container.innerHTML = `
    <section class="shop-section">
      <h2>Tienda</h2>
      <div id="products-container"></div>
      <aside id="cart-container" class="cart-section"></aside>
    </section>
  `;
  const productsContainer = container.querySelector('#products-container');
  const cartContainer = container.querySelector('#cart-container');

  // Estado loading
  productsContainer.innerHTML = '<p class="shop-loading">Cargando productos...</p>';
  renderCart(cartContainer);

  // Cargar productos dinámicamente
  loadProducts(productsContainer);
}

/**
 * Carga productos desde el backend y gestiona estados.
 * @param {HTMLElement} productsContainer - Contenedor de productos
 */
async function loadProducts(productsContainer) {
  try {
    const products = await getProducts();
    if (!products || products.length === 0) {
      productsContainer.innerHTML = '<p class="shop-empty">No hay productos disponibles.</p>';
    } else {
      renderProducts(productsContainer, products);
    }
  } catch (error) {
    productsContainer.innerHTML = `<p class="shop-error">Error al cargar productos: ${error.message}</p>`;
  }
}
