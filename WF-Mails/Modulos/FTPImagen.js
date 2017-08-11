var Client = require('ftp');
var fs = require('fs');
let server = {
    host: "lnxsrv3",
    user: "teamanalisis",
    password: "Corrientes1615"
};
var FTP = function () {
    this.Update = function (objImagen,callback) {
        var c = new Client();
        c.on('ready', function () {
            c.put(objImagen.imagen, `/webforms/images/${objImagen.name}`, function (err) {
                callback(err);
                c.end();
            });
        });
        c.connect(server);
    }
};
module.exports = new FTP();