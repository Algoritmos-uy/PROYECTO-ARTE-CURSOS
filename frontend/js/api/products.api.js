// products.api.js
// Funciones para consumir la API de productos

const API_URL = '/api/products';

/**
 * Obtiene todos los productos
 */
export async function getProducts() {
	const res = await fetch(API_URL);
	if (!res.ok) throw new Error('Error al obtener productos');
	return await res.json();
}

/**
 * Obtiene un producto por ID
 */
export async function getProduct(id) {
	const res = await fetch(`${API_URL}/${id}`);
	if (!res.ok) throw new Error('Error al obtener producto');
	return await res.json();
}

/**
 * Crea un producto
 */
export async function createProduct(data) {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Error al crear producto');
	return await res.json();
}

/**
 * Actualiza un producto
 */
export async function updateProduct(id, data) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Error al actualizar producto');
	return await res.json();
}

/**
 * Elimina un producto
 */
export async function deleteProduct(id) {
	const res = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	});
	if (!res.ok) throw new Error('Error al eliminar producto');
	return await res.json();
}
