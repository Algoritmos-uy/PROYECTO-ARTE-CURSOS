// products.controller.js
// Controlador CRUD de productos

const Product = require('../models/product.model');

// Obtener todos los productos
exports.getAll = async (req, res) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener productos' });
	}
};

// Obtener producto por ID
exports.getById = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener producto' });
	}
};

// Crear producto
exports.create = async (req, res) => {
	try {
		const { name, description, price, image } = req.body;
		const product = await Product.create({ name, description, price, image });
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear producto' });
	}
};

// Actualizar producto
exports.update = async (req, res) => {
	try {
		const { name, description, price, image } = req.body;
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
		await product.update({ name, description, price, image });
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar producto' });
	}
};

// Eliminar producto
exports.delete = async (req, res) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
		await product.destroy();
		res.json({ message: 'Producto eliminado' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar producto' });
	}
};
