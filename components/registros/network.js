const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const {emitSocket} = require('../../socket')
const { isAuth } = require('../../isAuth');


router.get('/', function(req, res) {
    try {
        const decoded = isAuth(req.headers.authorization)
        controller.getReg()
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


module.exports = router;