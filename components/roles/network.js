const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.addRol(req.body)
                .then(data => {
                    emitSocket('roles', {
                        action: 'create',
                        res: data
                    });
                    return response.success(req, res, data, 200);
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

router.get('/', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.getRol()
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

router.patch('/:idRol', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.patchRol(req.params.idRol, req.body)
                .then(data => {
                    emitSocket('roles', {
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