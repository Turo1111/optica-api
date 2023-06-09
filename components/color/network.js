const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
    controller.findExist(req.body.descripcion)
    .then(color => {
        if (!color) {
            controller.addColor(req.body)
            .then(data => {
                emitSocket('color', {
                    action: 'create',
                    res: data
                });
                return response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err); 
            });
        }else{
            response.error(req, res, 'Color ya existente', 500, err); 
        }

    })
    .catch(err=>{
        response.error(req, res, 'Color ya existente', 500, err); 
    })
    
    
});

router.get('/', function(req, res) {
    controller.getColor()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idColor', function(req, res) {
    controller.patchColor(req.params.idColor, req.body)
        .then(data => {
            emitSocket('color', {
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