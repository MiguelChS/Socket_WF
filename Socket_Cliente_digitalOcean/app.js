/**
 * Module dependencies.
 */

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })); // support encoded bodies
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/apiwf2/getwo', require('./routes/getwo'));
app.use('/apiwf2/getwosbycsr', require('./routes/getwosbycsr'));
app.use('/apiwf2/login', require('./routes/login'));
app.use('/apiwf2/sendform', require('./routes/sendform'));
app.use('/apiwf2/cliente', require('./routes/cliente'));
app.use('/apiwf2/forms', require('./routes/Forms'))

app.listen(3030, function() {
    console.log('Listen Client Socket Digital Ocean 3030');
});