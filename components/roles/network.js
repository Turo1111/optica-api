const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
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
    
});

router.get('/', function(req, res) {
    controller.getRol()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idRol', function(req, res) {
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
});

module.exports = router;