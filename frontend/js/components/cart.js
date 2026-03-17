// cart.js
// Módulo para gestionar el carrito de compras

let cart = [];

/**
 * Agrega un producto al carrito
 * @param {Object} product
 */
export function addToCart(product) {
  const item = cart.find(p => p.id === product.id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

/**
 * Quita un producto del carrito
 * @param {number} productId
 */
export function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
}

/**
 * Obtiene el carrito actual
 * @returns {Array}
 */
export function getCart() {
  return cart;
}

/**
 * Renderiza el carrito en el contenedor
 * @param {HTMLElement} container
 */
export function renderCart(container) {
  if (cart.length === 0) {
    container.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }
  container.innerHTML = `
    <ul class="cart-list">
      ${cart.map(item => `
        <li>
          <span>${item.name} x${item.quantity}</span>
          <button data-id="${item.id}" class="cart-remove-btn">Eliminar</button>
        </li>
      `).join('')}
    </ul>
    <p>Total: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
  `;
  // Eventos para eliminar
  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.id));
      renderCart(container);
    });
  });
}
