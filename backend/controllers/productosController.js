const cloudinary = require('../cloudinaryConfig');
const Producto = require('../models/Producto');
const mongoose = require('mongoose');


// Función para subir una imagen a Cloudinary y crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const imagen = req.file; // Multer almacena el archivo en req.file

    // Validar que la imagen exista
    if (!imagen) {
      return res.status(400).json({ error: 'La imagen es obligatoria' });
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(imagen.path, {
      folder: 'productos', // Carpeta personalizada en Cloudinary
    });

   

    // Crear un nuevo producto con la URL de la imagen de Cloudinary
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      imagen: result.secure_url, // La URL pública de la imagen
    });

    // Guardar el producto en la base de datos
    await nuevoProducto.save();

    // Responder con el producto creado
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen y guardar el producto' });
  }
};


const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
};

// Controlador para obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params; // Extraer el ID de los parámetros de la ruta

  try {
    // Buscar el producto en la base de datos por su ID
    const producto = await Producto.findById(id);

    // Verificar si el producto existe
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Enviar el producto como respuesta
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

module.exports = { crearProducto ,obtenerProductos, obtenerProductoPorId };
