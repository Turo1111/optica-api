const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', function(req, res) {
    controller.findExist(req.body.idCliente)
        .then(senia=>{
            if(!senia){
                controller.addSenia(req.body)
                    .then(data => {
                        return response.success(req, res, data, 200);
                    })
                    .catch(err => {
                        response.error(req, res, 'Internal error', 500, err); 
                    });
            }else{
                response.error(req, res, 'Cliente ya posee senia', 500, err); 
            }
        })
        .catch(err=>{
            response.error(req, res, 'Cliente ya posee senia', 500, err); 
        })
    
    
});

router.get('/', function(req, res) {
    controller.getSenia()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idSenia', function(req, res) {
    controller.patchSenia(req.params.idSenia, req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

module.exports = router;