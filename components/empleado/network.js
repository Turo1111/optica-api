const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {emitSocket} = require('../../socket')

router.post('/', function(req, res) {
    controller.findExist(req.body.usuario)
        .then(empleado => {
            if(!empleado){
                controller.addEmpleado(req.body)
                    .then(data => {
                        emitSocket('empleado', {
                            action: 'create',
                            res: data
                        });
                        return response.success(req, res, data, 200);
                    })
                    .catch(err => {
                        response.error(req, res, 'Internal error', 500, err); 
                    });
            }else{
                response.error(req, res, 'Usuario ya existente', 500, err); 
            }
        })
        .catch(err=>{
            response.error(req, res, 'Usuario ya existente', 500, err); 
        })
    
    
});

router.get('/', function(req, res) {
    controller.getEmpleado()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.post('/login', function(req, res) {
    controller.loginEmpleado(req.body.usuario, req.body.password)
        .then(data => {
            if (! bcrypt.compareSync(req.body.password, data.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario o contraseña incorrectos"
                    }
                 })
            }else{
                const token = jwt.sign({ usuario: data.usuario }, 'a5y9k88dfrt52bnm');
                return res.status(200).json({
                  ok: true,
                  token: token,
                  data: data
                });
            }
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idEmpleado', function(req, res) {
    controller.patchEmpleado(req.params.idEmpleado, req.body)
        .then(data => {
            emitSocket('empleado', {
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