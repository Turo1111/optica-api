const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
    controller.addLineaVenta(req.body)
        .then(data => {
            emitSocket('lineaVenta', {
                action: 'create',
                res: data
            });
            return response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err); 
        });
    
});

router.get('/', function(req, res) {
    controller.getLineaVenta()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idLineaVenta', function(req, res) {
    controller.patchLineaVenta(req.params.idLineaVenta, req.body)
        .then(data => {
            emitSocket('lineaVenta', {
                action: 'patch',
                res: req.body
            });
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

module.exports = router;