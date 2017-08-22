var express = require('express');
var router = express.Router();
var io = require('socket.io-client');

router.get("/:pais/:userid", (req, res) => {
    var url = 'http://ncrapps.com:8080';
    var socket = io.connect(url);
    var datos = { userid: req.params.userid, pais: req.params.pais }
    socket.on('connect', () => {
        socket.emit('setUserId', datos.userid);
        socket.emit('getForms', datos);
    });
    socket.on('retornogetForms', (data) => {
        res.status(200).json(data.detail);
    });
})

router.post("/", (req, res) => {
    console.log("---------- entrando form digital ocean ------------------");
    console.log(req.body);
    var url = 'http://ncrapps.com:8080';
    var socket = io.connect(url);
    var datos = { userid: req.body.userid, form: req.body.form }
    socket.on('connect', () => {
        socket.emit('setUserId', datos.userid);
        socket.emit('sendForms', datos);
    });
    socket.on('retornosendForms', (data) => {
        console.log("respuesta----------------------------------")
        console.log(data)
        console.log("FIN respuesta----------------------------------")
        if (data.err) {
            res.status(200).send();
        } else {
            res.status(500).send();
        }
    });
})

module.exports = router;