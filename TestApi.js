let http = require("http");
var option = {
    hostname: "ncrapps.com",
    path: "/apiwf2/forms/AR/mc185249_251",
    method: "GET",
    port: ""
};

var reqGet = http.request(option, function(res) {
    var result = "";
    res.setEncoding('utf8');

    res.on('data', function(data) {
        result += data;
    });

    res.on('end', function() {
        if (res.statusCode === 204 || res.statusCode === 500 || res.statusCode === 400) {
            console.log("-------warning peticion API------");
            console.log(res.statusCode);
            console.log(result);
        } else {
            var resultado = JSON.parse(result);
            console.log(resultado);
        }
    })

})

reqGet.on('error', function(e) {
    console.error("/*--------- Error peticion API---------*/");
    console.error(e);
});

reqGet.end();