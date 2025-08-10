const { v4: uuidv4 } = require('uuid');
const Product = require('../models/productModel');

const productController = {
    getAllProducts: (req, res) => {
        Product.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('products', { products: results });
        });
    },

    getProductById: (req, res) => {
        Product.getById(req.params.id, (err, results) => {
            if (err) return res.status(500).send(err.message);
            const product = results[0];
            if (!product) return res.status(404).send('Product not found');
            res.render('detail', { product });
        });
    },

    searchProducts: (req, res) => {
        Product.searchByKeyword(req.params.keyword, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    },

    createProduct: (req, res) => {
        const id = uuidv4();
        Product.create({ id, ...req.body }, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, message: 'Product created' });
        });
    },

    updateProduct: (req, res) => {
        Product.update(req.params.id, req.body, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product updated' });
        });
    },

    softDeleteProduct: (req, res) => {
        Product.softDelete(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product soft-deleted' });
        });
    },

    restoreProduct: (req, res) => {
        Product.restore(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Product restored' });
        });
    }
};

module.exports = productController;
