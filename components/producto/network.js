const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {emitSocket} = require('../../socket')

router.post('/', upload.single('imagen'), function(req, res) {
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
});

router.get('/', function(req, res) {
    controller.getProducto()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.patch('/:idProducto', upload.single('newimagen'), function(req, res) {
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
});

module.exports = router;