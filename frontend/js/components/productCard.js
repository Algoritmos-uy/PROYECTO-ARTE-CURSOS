// productCard.js
// Componente reutilizable para mostrar un producto

/**
 * Genera el HTML de una tarjeta de producto
 * @param {Object} product
 * @returns {string} HTML
 */
export function productCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image || 'img/default-product.png'}" alt="${product.name}" class="product-card-img">
      <div class="product-card-body">
        <h4 class="product-card-title">${product.name}</h4>
        <p class="product-card-desc">${product.description || ''}</p>
        <span class="product-card-price">$${product.price}</span>
        <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
      </div>
    </div>
  `;
}
