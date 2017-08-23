var express = require('express');
var router = express.Router();
var io = require('socket.io-client');

router.get("/:userid/:pais", (req, res) => {
    var url = 'http://ncrapps.com:8080';
    var socket = io.connect(url);
    var datos = { userid: req.params.userid, pais: req.params.pais }
    socket.on('connect', () => {
        socket.emit('setUserId', datos.userid);
        socket.emit('ClienteGet', datos);
    });
    socket.on('retornoClienteGet', (data) => {
        if(data.detail){
            res.status(200).json(data.detail);
        }else{
            res.status(500).send();
        }
    });
})

module.exports = router;