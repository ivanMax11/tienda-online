const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta absoluta del directorio 'uploads/'
const uploadsDir = path.join(__dirname, '../uploads');

// Crear la carpeta 'uploads/' si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // `recursive` asegura que se creen subdirectorios si es necesario
}

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Carpeta donde se guardarán los archivos temporalmente
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // Generar un sufijo único
    const extension = path.extname(file.originalname); // Obtener extensión del archivo
    const baseName = path.basename(file.originalname, extension); // Obtener nombre base del archivo
    cb(null, `${baseName}-${uniqueSuffix}${extension}`); // Ejemplo: imagen-1234567890.jpg
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo debe ser una imagen'), false);
  }
};

// Configurar el middleware de multer
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
