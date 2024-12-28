const express = require('express');
const { registrar, login } = require('../controllers/authController');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', registrar);

// Ruta para loguear un usuario
router.post('/login', login);

module.exports = router;