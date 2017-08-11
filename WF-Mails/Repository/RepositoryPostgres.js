let axios = require("axios");

function updatePostgres(form,err){
    return axios({
            method: 'PUT',
            url: `http://${process.env.CLOUD_WF}/apiwf/api/updateForm`,
            data: {
                formid: form.formid.value,
                err: err,
                sendto: form.Contactos.getConcatenado(),
                enviado: form.enviado.value,
                insersql: form.insertSql.value
            },
            headers: {
                'Content-Type': "application/json",
            },
            json: true
        })
}

module.exports={
    updatePostgres
}