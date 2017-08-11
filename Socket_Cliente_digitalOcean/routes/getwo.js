var express = require('express');
var router = express.Router();
var io = require('socket.io-client');



router.get('/:userid/:pais/:workorder', function(req, res, next) {
  var url = 'http://ncrapps.com:8080';
  //var url = 'http://localhost:8080';

  var socket = io.connect(url);

  var datos = { userid: req.params.userid,  pais: req.params.pais,  wo: req.params.workorder }

      socket.on('connect', function () {

        socket.emit('setUserId',  datos.userid );
        socket.emit('pedidoWO', datos);

      });

      socket.on('retornoWO', function(data) {
        
            res.json(data);
      });

     


});

module.exports = router;
