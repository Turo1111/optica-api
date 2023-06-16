const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {emitSocket} = require('../../socket')
require('dotenv').config();
const api = process.env.API_KEY;

router.post('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
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
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
    
    
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getEmpleado()
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(err => {
                response.error(req, res, 'Internal error', 500, err);
            });
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

router.post('/login', function(req, res) {

    controller.loginEmpleado(req.body.usuario, req.body.password)
        .then(data => {
            console.log("network",data)
            if (! bcrypt.compareSync(req.body.password, data[0].password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Usuario o contraseña incorrectos"
                    }
                 })
            }else{
                const token = jwt.sign({ usuario: data.usuario }, api);
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
    try {
        const decoded = isAuth(req.headers.authorization)
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
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

module.exports = router;