const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.addOrden(req.body)
            .then(data => {
                emitSocket('orden', {
                    action: 'create',
                    res: data
                });
                return response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err); 
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
    
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getOrden()
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

router.patch('/:idOrden', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.patchOrden(req.params.idOrden, req.body)
            .then(data => {
                emitSocket('orden', {
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