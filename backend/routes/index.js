const express = require('express');
const router = express.Router();
const productosRoutes = require('./productos');
const authRoutes = require('./auth');

// Rutas para los productos
router.use('/productos', productosRoutes);

// Rutas para autenticar
router.use('/auth', authRoutes);

module.exports = router;
