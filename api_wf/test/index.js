let repo = require("../service/cliente");

repo.getCliente()
    .then((result) => {
        console.log(result.map(x => x.Nombres)) // first recordset from result.recordsets
    })
    .catch((err) => {
        console.log(err)
    })