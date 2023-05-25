exports.success = function (req, res, message, status, token) {
    res.status(status || 200).send({ 
        error: '',
        body: message,
        token: token
    });
}

exports.error = function (req, res, message, status, details) {
    console.error('[response error] ' + details);

    res.status(status || 500).send({ 
        error: message,
        body: '',
    });
}