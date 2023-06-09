const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
    controller.findExist(req.body.descripcion)
    .then(categoria => {
        if(!categoria){
            controller.addCategoria(req.body)
            .then(data => {
                emitSocket('categoria', {
                    action: 'create',
                    res: data
                });
                return response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err); 
            });
        }else{
            response.error(req, res, 'Categoria ya existente', 500, err); 
        }
        
    })
    .catch(err=>{
        response.error(req, res, 'Categoria ya existente', 500, err); 
    })
    
    
});

router.get('/', function(req, res) {
    controller.getCategoria()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idCategoria', function(req, res) {
    controller.patchCategoria(req.params.idCategoria, req.body)
        .then(data => {
            emitSocket('categoria', {
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