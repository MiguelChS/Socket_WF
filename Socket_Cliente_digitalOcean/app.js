/**
 * Module dependencies.
 */

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })); // support encoded bodies

app.use('/apiwf2/getwo', require('./routes/getwo'));
app.use('/apiwf2/getwosbycsr', require('./routes/getwosbycsr'));
app.use('/apiwf2/login', require('./routes/login'));
app.use('/apiwf2/sendform', require('./routes/sendform'));
app.use('/apiwf2/cliente', require('./routes/cliente'));
app.use('/apiwf2/forms', require('./routes/Forms'))

app.listen(3030, function() {
    console.log('Express server listening on port 3030');
});