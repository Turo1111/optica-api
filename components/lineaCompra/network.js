const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.addLineaCompra(req.body)
            .then(data => {
                emitSocket('lineaCompra', {
                    action: 'create',
                    res: data
                });
                return response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err); 
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
    }
    
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getLineaCompra()
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err);
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
    }
});

router.patch('/:idLineaCompra', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.patchLineaCompra(req.params.idLineaCompra, req.body)
            .then(data => {
                emitSocket('lineaCompra', {
                    action: 'create',
                    res: req.body
                });
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err);
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
    }
});

module.exports = router;