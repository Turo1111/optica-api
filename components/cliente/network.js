const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const bcrypt = require('bcrypt');
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.findExist(req.body.dni)
            .then(cliente => {
                if(!cliente){
                    controller.addCliente(req.body)
                        .then(data => {
                            emitSocket('cliente', {
                                action: 'create',
                                res: data
                            });
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
    } catch (error) {
        return response.error(req, res, 'Token Inválido, cierre y vuelva abrir sesion', 401, error);
    }
    
    
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getCliente()
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

router.patch('/:idCliente', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.patchCliente(req.params.idCliente, req.body)
            .then(data => {
                emitSocket('cliente', {
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