const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.findExist(req.body.idCliente)
            .then(senia=>{
                if(!senia){
                    controller.addSenia(req.body)
                        .then(data => {
                            emitSocket('senia', {
                                action: 'create',
                                res: data
                            });
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
    } catch (error) {
        return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
    }
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getSenia()
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

router.patch('/:idSenia', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.patchSenia(req.params.idSenia, req.body)
            .then(data => {
                emitSocket('senia', {
                    action: 'patch',
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