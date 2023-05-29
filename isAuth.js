const jwt = require('jsonwebtoken');

export function isAuth ( token ) {
    const authHeader = token;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autorización faltante o en formato incorrecto' });
    }

    const token = authHeader.substring('Bearer '.length);

    const decoded = jwt.verify(token, 'a5y9k88dfrt52bnm');

    return decoded
}