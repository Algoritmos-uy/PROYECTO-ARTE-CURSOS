// cart.js
// Módulo para gestionar el carrito de compras

// Estado del carrito en memoria. Se inicializa desde localStorage si existe.
let cart = [];
try {
  const stored = localStorage.getItem('cart');
  if (stored) cart = JSON.parse(stored) || [];
} catch (e) {
  cart = [];
}

function persistCart() {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (e) {
    // Silencioso: si falla el almacenamiento, no bloqueamos la UX
    console.warn('No se pudo persistir el carrito:', e);
  }
}

// Simple comprobación de sesión: por ahora mira si existe 'user' en localStorage.
// En producción, reemplazar por verificación real (cookie, token, endpoint).
export function isAuthenticated() {
  try {
    return Boolean(localStorage.getItem('user'));
  } catch (e) {
    return false;
  }
}

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
  persistCart();
}

/**
 * Quita un producto del carrito
 * @param {number} productId
 */
export function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
  persistCart();
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
  // Si está vacío mostramos mensaje y devolvemos (no hay botón pagar)
  if (cart.length === 0) {
    container.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  // Render del carrito con botón de pago
  container.innerHTML = `
    <ul class="cart-list">
      ${cart.map(item => `
        <li>
          <span>${item.name} x${item.quantity}</span>
          <button data-id="${item.id}" class="cart-remove-btn btn">Eliminar</button>
        </li>
      `).join('')}
    </ul>
    <p class="cart-total">Total: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>
    <div class="cart-actions">
      <button class="cart-pay-btn btn">Pagar</button>
    </div>
  `;
  // Eventos para eliminar
  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.id));
      renderCart(container);
    });
  });

  // Botón Pagar: aparece solo si hay productos (ya sabemos que cart.length>0)
  const payBtn = container.querySelector('.cart-pay-btn');
  if (payBtn) {
    const authed = isAuthenticated();
    if (!authed) {
      payBtn.disabled = true;
      payBtn.title = 'Inicia sesión para poder pagar';
    } else {
      payBtn.disabled = false;
      payBtn.title = 'Proceder al pago';
    }

    payBtn.addEventListener('click', () => {
      if (!isAuthenticated()) {
        const go = confirm('Necesitas iniciar sesión para pagar. ¿Deseas ir a la página de inicio de sesión?');
        if (go) {
          // Redirigir a la página de login (implementar ruta real en la app)
          window.location.href = '/login';
        }
        return;
      }

      // Aquí iría la lógica de checkout (llamar endpoint /api/checkout, etc.)
      // Por ahora mostramos un mensaje y simulamos la redirección.
      alert('Iniciando proceso de pago... (placeholder)');
      // window.location.href = '/checkout';
    });
  }
  // Persistir cambios: asegurar que el estado actual quede guardado
  persistCart();
}
