//funcion para determinar si el usuario esta autorizado o no para acceder a una ruta segun su rol

const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = require('../utils/jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({error: 'Unauthorized'});
    }
}

export default authMiddleware;