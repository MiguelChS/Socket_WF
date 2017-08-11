var express = require('express');
var router = express.Router();
var io = require('socket.io-client');

router.get("/:userid", (req, res) => {
    var url = 'http://ncrapps.com:8080';
    var socket = io.connect(url);
    var datos = { userid: req.params.userid }
    socket.on('connect', () => {
        socket.emit('setUserId', datos.userid);
        socket.emit('ClienteGet', datos);
    });
    socket.on('retornoClienteGet', (data) => {
        res.json(data);
    });
})

module.exports = router;