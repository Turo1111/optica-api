const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {emitSocket} = require('../../socket')
require('dotenv').config();
const api = process.env.API_KEY;
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.findExist(req.body.usuario)
                .then(empleado => {
                    if(!empleado){
                        controller.addEmpleado(req.body)
                            .then(data => {
                                emitSocket('empleado', {
                                    action: 'create',
                                    res: {
                                        ...data._doc,
                                        sucursal: req.body.sucursal
                                    }
                                });
                                return response.success(req, res, data, 200);
                            })
                            .catch(err => {
                                response.error(req, res, 'Internal error', 500, err); 
                            });
                    }else{
                        response.error(req, res, 'Usuario ya existente', 500, err); 
                    }
                })
                .catch(err=>{
                    response.error(req, res, 'Usuario ya existente', 500, err); 
                })
                
            })
            .catch(error => {
                return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
            });
    } catch (error) {
        return response.error(req, res, 'Error en el servidor', 500, error);
    }
    
});

router.get('/', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }

                controller.getEmpleado()
                    .then(data => {
                        response.success(req, res, data, 200);
                    })
                    .catch(err => {
                        response.error(req, res, 'Internal error', 500, err);
                    });
            })
            .catch(error => {
                return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
            });
    } catch (error) {
        return response.error(req, res, 'Error en el servidor', 500, error);
    }
});

router.post('/login', function(req, res) {
    console.log(req.body.usuario, req.body.password);
    controller.loginEmpleado(req.body.usuario, req.body.password)
        .then(data => {
            
            console.log(data[0]);
            if (! bcrypt.compareSync(req.body.password, data[0].password)) {
                response.error(req, res, 'Usuario o contraseña incorrecto', 500, err);
            }else{
                const token = jwt.sign({ usuario: data[0].usuario }, api);
                emitSocket('empleado', {
                    action: 'login',
                    res: data[0]
                });
                return res.status(200).json({
                  ok: true,
                  token: token,
                  data: data[0]
                });
            }
        })
        .catch(err => {
            console.log('error');
            response.error(req, res, 'Usuario o contraseña incorrecto', 500, err);
        });
});

router.patch('/:idEmpleado', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }

                controller.patchEmpleado(req.params.idEmpleado, req.body)
                .then(data => {
                    emitSocket('empleado', {
                        action: 'patch',
                        res: req.body
                    });
                    response.success(req, res, data, 200);
                })
                .catch(err => {
                    response.error(req, res, 'Internal error', 500, err);
                });
            })
            .catch(error => {
                return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
            });
    } catch (error) {
        return response.error(req, res, 'Error en el servidor', 500, error);
    }
});

module.exports = router;
