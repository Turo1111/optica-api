const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
    controller.findExist(req.body.descripcion)
    .then(marca => {
        if (!marca) {
            controller.addMarca(req.body)
                .then(data => {
                    emitSocket('marca', {
                        action: 'create',
                        res: data
                    });
                    return response.success(req, res, data, 200);
                })
                .catch(err => {
                    response.error(req, res, 'Internal error', 500, err); 
                });
        }else{
            response.error(req, res, 'Marca ya existente', 500, err); 
        }
    })
    .catch(err=>{
        response.error(req, res, 'Marca ya existente', 500, err); 
    })
    
});

router.get('/', function(req, res) {
    controller.getMarca()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idMarca', function(req, res) {
    controller.patchMarca(req.params.idMarca, req.body)
        .then(data => {
            emitSocket('marca', {
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