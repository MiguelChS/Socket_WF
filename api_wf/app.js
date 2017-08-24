let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let api = require('./api')
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api", api(express.Router()));

process.on('SIGINT', () => {
    mongoose.connections.forEach((value) => {
        value.close();
    });
    process.exit(1);
});

connect()
    .on('error', () => {})
    .on('disconnected', connect)
    .once('open', () => {
        app.listen(3015, () => {
            console.log(`api Cliente add Listen 3015`);
        });
    });

function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(`mongodb://mongodb/Formularios`, options).connection;
}