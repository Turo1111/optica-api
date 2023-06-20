const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.findExist(req.body.idProducto)
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
                    response.error(req, res, 'Producto con oferta existente', 500, err); 
                }
            })
            .catch(err=>{
                response.error(req, res, 'Producto con oferta existente', 500, err); 
            })
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getOferta()
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err);
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

router.patch('/:idOferta', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
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
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

module.exports = router;