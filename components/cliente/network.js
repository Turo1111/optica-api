const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', function(req, res) {
    controller.findExist(req.body.dni)
        .then(cliente => {
            if(!cliente){
                controller.addCliente(req.body)
                    .then(data => {
                        return response.success(req, res, data, 200);
                    })
                    .catch(err => {
                        response.error(req, res, 'Internal error', 500, err); 
                    });
            }else{
                response.error(req, res, 'Cliente ya existente', 500, err); 
            }
        })
        .catch(err=>{
            response.error(req, res, 'Cliente ya existente', 500, err); 
        })
    
    
});

router.get('/', function(req, res) {
    controller.getCliente()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idCliente', function(req, res) {
    controller.patchCliente(req.params.idCliente, req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

module.exports = router;