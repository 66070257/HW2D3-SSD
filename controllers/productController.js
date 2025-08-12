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
        const keyword = req.query.q || '';
        Product.searchByKeyword(keyword, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('products', { products: results, q: keyword });
        });
    },


    createProduct: (req, res) => {
        Product.create(req.body, (err, insertId) => {
            if (err) return res.status(500).json({ error: err.message });
            // res.status(201).json({ id: insertId, message: 'Product created' });
            res.redirect('/api');
        });
    },

    updateProduct: (req, res) => {
        Product.update(req.params.id, req.body, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            // res.json({ message: 'Product updated' });
            res.redirect('/api');
        });
    },


    softDeleteProduct: (req, res) => {
        Product.softDelete(req.params.id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            // res.json({ message: 'Product soft-deleted' });
            res.redirect('/api');
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
