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
      <h1>Tienda</h1>
      <h2>Productos personalizados</h2>
      <div id="products-container"></div>
      <h1>Impresiones 3d</h1>
      <h2>Accesorios impresos en 3D</h2>
      <div id="products-container-3d"></div>
      <aside id="cart-container" class="cart-section"></aside>
    </section>
  `;
  const productsContainer = container.querySelector('#products-container');
  const productsContainer3d = container.querySelector('#products-container-3d');
  const cartContainer = container.querySelector('#cart-container');
  // Hacer que el carrito use el estilo flotante (se controla por CSS en desktop)
  cartContainer.classList.add('cart-floating');

  // Productos personalizados por sublimación (mock)
  const mockProducts = [
    {
      id: 1,
      name: 'Taza y remera personalizadas',
      description: 'Taza de cerámica sublimada con tu diseño.',
      price: 350,
      image: 'img/products/product-1.png'
    },
    {
      id: 2,
      name: 'Remera, bolsa y gorro personalizados',
      description: 'Remera y accesorios estampados por sublimación.',
      price: 650,
      image: 'img/products/product-2.png'
    },
    {
      id: 3,
      name: 'Almohadón personalizado',
      description: 'Almohadón decorativo sublimado a color.',
      price: 480,
      image: 'img/products/product-3.png'
    },
    {
      id: 4,
      name: 'Bolsa personalizada',
      description: 'Bolsa con diseño único por sublimación.',
      price: 220,
      image: 'img/products/product-4.png'
    },
    {
      id: 5,
      name: 'Cartera escolar personalizada',
      description: 'Cartera escolar sublimada para regalos.',
      price: 300,
      image: 'img/products/product-5.png'
    },
    {
      id: 6,
      name: 'Morral personalizado',
      description: 'Morral sublimado con tu imagen.',
      price: 400,
      image: 'img/products/product-6.png'
    }
  ];

  // Productos impresos en 3D (mock)
  const mockProducts3d = [
    {
      id: 101,
      name: 'Cuadro de mandala 3D',
      description: 'Cuadro decorativo impreso en 3D.',
      price: 250,
      image: 'img/products/3d/cuadro-mandala.png'
    },
    {
      id: 102,
      name: 'Cuarzo verde múltiple 3D',
      description: 'Cuarzo impreso en 3D con diseño único.',
      price: 120,
      image: 'img/products/3d/cuartzo-verde.png'
    },
    {
      id: 103,
      name: 'Flamengos 3D',
      description: 'Flamengos decorativos  impresos en 3D.',
      price: 180,
      image: 'img/products/3d/flamengos.png'
    },
    {
      id: 104,
      name: 'Florero + cuenco 3D',
      description: 'Florero y cuenco impresos en 3D.',
      price: 320,
      image: 'img/products/3d/florero-cuenco.png'
    },
    {
      id: 105,
      name: 'Jarrón decorativo 3D',
      description: 'Jarrón decorativo impreso en 3D.',
      price: 210,
      image: 'img/products/3d/jarron.png'
    },
    {
      id: 106,
      name: 'Rosa porta velas 3D',
      description: 'Rosa porta velas impresa en 3D.',
      price: 90,
      image: 'img/products/3d/rosa-porta-vela.png'
    }
  ]

  // Renderizar los productos mock
  renderProducts(productsContainer, mockProducts);
  renderProducts(productsContainer3d, mockProducts3d);
  renderCart(cartContainer);

  // Botón flotante para ver carrito en móviles
  let cartFloatBtn = document.querySelector('.cart-float-btn');
  if (!cartFloatBtn) {
    cartFloatBtn = document.createElement('button');
    cartFloatBtn.className = 'cart-float-btn';
    cartFloatBtn.title = 'Ver carrito';
    cartFloatBtn.innerHTML = '🛒';
    cartFloatBtn.addEventListener('click', () => {
      // Mostrar/ocultar el aside del carrito en móviles
      cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
      cartContainer.scrollIntoView({ behavior: 'smooth' });
    });
    document.body.appendChild(cartFloatBtn);
  }
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
