var express = require('express');
var router = express.Router();
var io = require('socket.io-client');



router.post('/', function(req, res, next) {
  var url = 'http://ncrapps.com:8080';
  //var url = 'http://localhost:8080';

  var socket = io.connect(url);

  var datos = { userid: req.body.userid,  username: req.body.username,  password: req.body.password }

      socket.on('connect', function () {

        socket.emit('setUserId',  datos.userid );
        socket.emit('pedidoLogin', datos);

      });

      socket.on('retornoLogin', function(data) {
        //console.log('pasoooooo');
            res.json(data);
      });

    


});

module.exports = router;
