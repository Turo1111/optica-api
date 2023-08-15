const jwt = require('jsonwebtoken');
require('dotenv').config();
const api = process.env.API_KEY;

function isAuth ( header ) {
    const authHeader = header;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autorización faltante o en formato incorrecto' });
    }

    const token = authHeader.substring('Bearer '.length);

    const decoded = jwt.verify(token, api);

    return decoded
}

module.exports = {
  isAuth
}