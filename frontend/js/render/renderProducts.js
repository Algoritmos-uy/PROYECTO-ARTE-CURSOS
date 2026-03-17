// renderProducts.js
// Renderiza productos en el contenedor usando productCard

import { productCard } from '../components/productCard.js';

/**
 * Renderiza un array de productos en el contenedor
 * @param {HTMLElement} container
 * @param {Array} products
 */
import { addToCart, renderCart } from '../components/cart.js';

export function renderProducts(container, products) {
  container.innerHTML = products.map(productCard).join('');
  // Agregar eventos a los botones
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const product = products.find(p => p.id === id);
      addToCart(product);
      // Renderizar el carrito si existe
      const cartContainer = document.querySelector('#cart-container');
      if (cartContainer) renderCart(cartContainer);
    });
  });
}
