var express = require('express');
var router = express.Router();
var io = require('socket.io-client');



router.post('/:userid', function(req, res, next) {
  var url = 'http://ncrapps.com:8080';
  //var url = 'http://localhost:8080';

  var socket = io.connect(url);

 var datos = { userid: req.params.userid,  form: req.body }

      socket.on('connect', function () {

        socket.emit('setUserId',  datos.userid );
        socket.emit('envioForm', datos);

      });

      socket.on('retornoForm', function(data) {
        
            res.json(data);
      });

     


});

module.exports = router;
