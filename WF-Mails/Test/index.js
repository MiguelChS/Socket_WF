let axios = require("axios");

axios.get("http://ncrapps.com/apiwf/api/cliente/AR")
    .then((result) => {
        console.log(result)
        z = 10
    })
    .catch((err) => {
        console.log(err)
        x = 12
    })