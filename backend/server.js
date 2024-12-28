require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Conectar a mogoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Importar las rutas personalizadas
const routes = require('./routes');
app.use('/api', routes); // Usa las rutas con prefijo '/api'



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});