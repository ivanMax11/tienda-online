const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraer el token

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Agregar la información del usuario a la solicitud
        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        console.error(error); // Agregar depuración de errores
        res.status(401).json({ msg: 'Token inválido' });
    }
};
