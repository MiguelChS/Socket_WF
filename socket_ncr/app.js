var
    request = require('request'),
    io = require('socket.io-client');

let axios = require("axios");

ioClient = io.connect('http://ncrapps.com:8080');

ioClient.on('connect', function() {
    ioClient.emit('setUserId', 'server');
});

ioClient.on('getForms', function(data) {
    axios.get(`http://lnxsrv02:3434/Forms/${data.pais}`)
        .then((result) => {
            ioClient.emit('retornogetForms', { userid: data.userid, detail: result });
        })
        .catch((err) => {
            console.log(data);
            console.log('--------------------------- Errooo -----------------------------------')
            console.log(err);
            ioClient.emit('retornogetForms', { userid: data.userid, detail: 'Error' });
        })
});

ioClient.on('sendForms', function(data) {
    axios.post(`http://lnxsrv02:3434/Forms`, data.form)
        .then((result) => {
            ioClient.emit('retornosendForms', { userid: data.userid, detail: true });
        })
        .catch((err) => {
            ioClient.emit('retornosendForms', { userid: data.userid, detail: false });
        })
});

ioClient.on('ClienteGet', function(data) {
    request('http://lnxsrv02:3015/api/cliente', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            ioClient.emit('retornoClienteGet', { userid: data.userid, detail: JSON.parse(body) });
        } else {
            console.log('error');
            ioClient.emit('retornoClienteGet', { userid: data.userid, detail: 'Error Get Cliente' });
        }
    });
});

ioClient.on('pedidoWO', function(data) {

    request('http://lnxsrv01/cmapi/getwo/' + data.pais + '/' + data.wo, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            ioClient.emit('retornoWO', { userid: data.userid, detail: JSON.parse(body) });
        } else {
            console.log('error');
            ioClient.emit('retornoWO', { userid: data.userid, detail: 'Error General getwo' });
        }
    });
});


ioClient.on('pedidoLogin', function(data) {

    request('http://lnxsrv01/cmapi/login/' + data.username + '/' + data.password, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            ioClient.emit('retornoLogin', { userid: data.userid, detail: JSON.parse(body) });
        } else {
            console.log('error');
            ioClient.emit('retornoLogin', { userid: data.userid, detail: 'Error General login' });
        }
    });
});

ioClient.on('pedidoWObyCsr', function(data) {

    request('http://lnxsrv01/cmapi/getwosbycsr/' + data.pais + '/' + data.csrcode, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            ioClient.emit('retornoWObyCsr', { userid: data.userid, detail: JSON.parse(body) });
        } else {
            console.log('error');
            ioClient.emit('retornoWObyCsr', { userid: data.userid, detail: 'Error General pedidoWObyCsr' });
        }
    });
});

ioClient.on('envioForm', function(data) {

    /*request('http://lnxsrv01/cmapi/getwosbycsr/' + data.pais + '/' + data.csrcode, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                        ioClient.emit('retornoWObyCsr', {userid: data.userid, detail: JSON.parse(body)});
                    } else {
                        console.log ('error');
                        ioClient.emit('retornoWObyCsr', {userid: data.userid, detail: 'Error General pedidoWObyCsr'});
            }
    });*/

    console.log(data)

    ioClient.emit('retornoForm', { userid: data.userid, detail: "Data Posted Successfully" });
});