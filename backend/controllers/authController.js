const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Registrar un usuario
const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Verificar la contraseña
    const esValido = await usuario.comparePassword(password);
    if (!esValido) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Crear el token
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = { registrar, login };
