const express = require('express');
const router = express.Router();
const { crearProducto ,obtenerProductos, obtenerProductoPorId } = require('../controllers/productosController');
const upload = require('../middleware/upload'); // Middleware para manejar la carga de archivos

// Ruta para crear un producto (con imagen)
router.post('/', upload.single('imagen'), crearProducto);

// Ruta para obtener productos
router.get('/', obtenerProductos);

// Ruta para obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);


module.exports = router;