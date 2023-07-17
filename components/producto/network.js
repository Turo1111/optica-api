const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');

router.post('/', upload.single('imagen'), function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.findExist(req.body.codigo)
        .then(producto=>{
            if (!producto) {
                controller.addProducto(req.body, req.file)
                .then(data => {
                    emitSocket('producto', {
                        action: 'create',
                        res: data
                    });
                    return response.success(req, res, data, 200);
                })
                .catch(err => {
                    response.error(req, res, 'Internal error', 500, err); 
                });
            }else{
                response.error(req, res, 'Codigo ya existente', 500, err);
            }
        })
        .catch(err=>{
            response.error(req, res, 'Codigo ya existente', 500, err); 
        })
    } catch (error) {
        return response.error(req, res, 'Token Inválido', 401, error);
    }
});

router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getProducto()
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

router.patch('/:idProducto', upload.single('newimagen'), function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.patchProducto(req.params.idProducto, req.body, req.file)
            .then(data => {
                emitSocket('producto', {
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