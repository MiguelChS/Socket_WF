//SOCKET WEB SERVER MANAGER 

var
    io = require('socket.io'),
    ioServer = io.listen(8080),
    customsID = {};

// Event fired every time a new client connects:
ioServer.on('connection', function(socket) {
    console.log('Socket Connected ID=' + socket.id)
        //CHANGE USER ID
    socket.on('setUserId', function(uId) {
        console.log("aca")
        customsID[uId] = socket.id
    });

    //DISCONNET SOCKET
    socket.on('disconnect', function() {});

    //WO DETAIL
    socket.on("pedidoWO", function(data) {
        ioServer.to(customsID['server']).emit('pedidoWO', data);
    });
    socket.on('retornoWO', function(data) {
        ioServer.to(customsID[data.userid]).emit('retornoWO', data);
    });

    //LOGIN
    socket.on("pedidoLogin", function(data) {
        ioServer.to(customsID['server']).emit('pedidoLogin', data);
    });
    socket.on('retornoLogin', function(data) {
        ioServer.to(customsID[data.userid]).emit('retornoLogin', data);
    });

    //WOs BY CSR
    socket.on("pedidoWObyCsr", function(data) {
        ioServer.to(customsID['server']).emit('pedidoWObyCsr', data);
    });
    socket.on('retornoWObyCsr', function(data) {
        ioServer.to(customsID[data.userid]).emit('retornoWObyCsr', data);
    });

    //WF ENVIO
    socket.on("envioForm", function(data) {
        ioServer.to(customsID['server']).emit('envioForm', data);
    });
    socket.on('retornoForm', function(data) {
        ioServer.to(customsID[data.userid]).emit('retornoForm', data);
    });

    //Obtener Cliente
    socket.on("ClienteGet", function(data) {
        ioServer.to(customsID['server']).emit('ClienteGet', data);
    });
    socket.on('retornoClienteGet', function(data) {
        ioServer.to(customsID[data.userid]).emit('retornoClienteGet', data);
    });

});