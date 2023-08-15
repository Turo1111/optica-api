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
                controller.findExist(req.body.idProducto, req.body.fechaInicio, req.body.fechaFinal)
                .then(oferta => {
                    if(!oferta){ 
                        controller.addOferta(req.body)
                            .then(data => {
                                emitSocket('oferta', {
                                    action: 'create',
                                    res: data
                                });
                                return response.success(req, res, data, 200);
                            })
                            .catch(err => {
                                response.error(req, res, 'Internal error', 500, err); 
                            }); 
                    }else{
                        response.error(req, res, 'Producto con oferta existente en esas fechas', 500, err); 
                    }
                })
                .catch(err=>{
                    response.error(req, res, 'Producto con oferta existente en esas fechas', 500, err); 
                }) 
            })
            .catch(error => {
                return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
            });
    } catch (error) {
        return response.error(req, res, 'Error en el servidor', 500, error);
    }
});

router.get('/:idProducto', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.getOferta(req.params.idProducto)
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

router.patch('/:idOferta', function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.patchOferta(req.params.idOferta, req.body)
                .then(data => {
                    emitSocket('oferta', {
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