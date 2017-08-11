var express = require('express');
var router = express.Router();
var io = require('socket.io-client');



router.get('/:userid/:pais/:csrcode', function(req, res, next) {
  var url = 'http://ncrapps.com:8080';
  //var url = 'http://localhost:8080';

  var socket = io.connect(url);

  var datos = { userid: req.params.userid,  csrcode: req.params.csrcode, pais: req.params.pais }

      socket.on('connect', function () {
        
        socket.emit('setUserId',  datos.userid );
        socket.emit('pedidoWObyCsr', datos);
        
      });

      socket.on('retornoWObyCsr', function(data) {
        
        res.json(data);
           
      });

     


});

module.exports = router;