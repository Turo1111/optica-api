const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', function(req, res) {
    controller.findExist(req.body.idProducto)
        .then(oferta => {
            if(!oferta){
                controller.addOferta(req.body)
                    .then(data => {
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
    
    
});

router.get('/', function(req, res) {
    controller.getOferta()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idOferta', function(req, res) {
    controller.patchOferta(req.params.idOferta, req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

module.exports = router;