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

export async function renderShop(container) {
  container.innerHTML = `
    <section class="shop-section">
      <h2>Tienda</h2>
      <div id="shop-list"></div>
      <aside id="cart-container" class="cart-section"></aside>
    </section>
  `;
  const shopList = container.querySelector('#shop-list');
  const cartContainer = container.querySelector('#cart-container');
  const products = await getProducts();
  renderProducts(shopList, products);
  renderCart(cartContainer);
}
