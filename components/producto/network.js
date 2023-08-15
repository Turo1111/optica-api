const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', upload.single('imagen'), function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.findExist(req.body.codigo)
                .then(producto=>{
                    if (!producto) {
                        controller.addProducto(req.body, req.file)
                        .then(data => {
                            emitSocket('producto', {
                                action: 'create',
                                res: {
                                    ...data._doc,
                                    categoria: req.body.categoria,
                                    marca: req.body.marca,
                                    color: req.body.color,
                                }
                            });
                            return response.success(req, res, data, 200);
                        })
                        .catch(err => {
                            response.error(req, res, 'Internal error', 500, err); 
                        });
                    }else{
                        response.error(req, res, 'Codigo ya existente', 500, err);
                    }
                })
                .catch(err=>{
                    response.error(req, res, 'Codigo ya existente', 500, err); 
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
                controller.getProducto()
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

router.patch('/:idProducto', upload.single('newimagen'), function(req, res) {
    try {
        isAuth(req.headers.authorization)
            .then(decoded => {
                if (decoded.error) {
                    return response.error(req, res, decoded.error, 401);
                }
                controller.patchProducto(req.params.idProducto, req.body, req.file)
                .then(data => {
                    emitSocket('producto', {
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