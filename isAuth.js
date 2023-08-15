const jwt = require('jsonwebtoken');
require('dotenv').config();
const api = process.env.API_KEY;
const Employee = require('./components/empleado/model');

async function isAuth ( header ) {
  return new Promise(async (resolve, reject) => {
    const authHeader = header;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reject({ error: 'Token de autorización faltante o en formato incorrecto' });
    }

    const token = authHeader.substring('Bearer '.length);

    try {
        const decoded = jwt.verify(token, api);
        const employee = await Employee.findOne({ usuario: decoded.usuario });

        if (!employee) {
            resolve({ error: 'Empleado no encontrado' });
        }

        if (!employee.estado) {
            resolve({ error: 'El estado del empleado es inactivo' });
        }

        resolve(decoded);
    } catch (error) {
        resolve({ error: 'Token inválido' });
    }
});
}

module.exports = {
  isAuth
}