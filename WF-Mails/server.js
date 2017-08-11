var express = require("express");
var app = express();
let bodyParser = require("body-parser");
var mail = require("./Modulos/main");
let repoForm = require("./Repository/RepositoryFormulario");
let fs = require("fs");

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

app.post("/Forms", (req, res) => {
    repoForm.insertJsonForm(req.body.id, JSON.stringify(req.body))
        .then((result) => {
            res.status(200).send();
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
})

app.get("/Forms/:pais", (req, res) => {
    let formularios = [];
    let jsonData = JSON.parse(fs.readFileSync('./JsonFormularios.Json', 'utf8'));
    switch (req.params.pais) {
        case "AR":
            {
                formularios = jsonData.filter(x => x.id == 1);
            }
        case "BR":
            {

            }
        case "CO":
            {

            }
        case "CL":
            {

            }
    }

    return res.status(200).json(formularios);

})

app.listen(3434, () => {
    console.log(`I listen in port 3434`)
});