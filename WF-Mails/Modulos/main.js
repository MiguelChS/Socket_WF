/**
 * Created by mc185249 on 18/08/2016
 */
let Mapper = require("../Entidades/MapperEntidades");
let axios = require("axios");
let ArmadoMail = require("./ArmadoMail");
let EnvioMails = require("./EnvioMail");
let EnvioError = require('./EnvioError');
let moment = require("moment");
let repoFormulario = require("../Repository/RepositoryFormulario")

function Mapeo(list) {
    //formulario mapeados
    let formulario = [];
    for (let attr in list) {
        list[attr] = list[attr].map(form => {
            formulario.push(Mapper.map(form, attr));
        })
    }
    return formulario;
}

function InitProcessSinRequest(data) {
    return new Promise((resolve, reject) => {
        let formularios = Mapeo(data);
        ArmadoMail(formularios)
            .then(resultFormConMail => EnvioMails(resultFormConMail))
            .then(result => {
                let Errores = result.filter(x => x.err)
                if (Errores.length) {
                    reject(Errores[0])
                } else {
                    resolve()
                }
            })
            .catch((err) => {
                if (err.hasOwnProperty('stack')) {
                    reject(err.stack)
                } else {
                    reject(err)
                }
            })
    })
}

function InitProcess() {
    console.log(`Iniciando Proceso : ${moment().format("YYYY-MM-DD HH:mm:ss")}`)
    axios.get(`http://${process.env.CLOUD_WF}/apiwf/api/getForms`)
        .then((result) => {
            if (result.data) {
                let formularios = Mapeo(result.data);
                ArmadoMail(formularios)
                    .then(resultFormConMail => EnvioMails(resultFormConMail))
                    .then(result => {
                        let Errores = result.filter(x => x.err)
                        if (Errores.length) {
                            EnvioError(JSON.stringify(Errores))
                        }
                    })
                    .catch((err) => {
                        if (err.hasOwnProperty('stack')) {
                            EnvioError(err.stack)
                        } else {
                            EnvioError(JSON.stringify(err))
                        }
                    })

            }
        })
        .catch((err) => {
            EnvioError(err.message)
        })

};


function formateDataToOld(array) {

}

function InitProcessSearchBase() {
    repoFormulario.GetJsonForm()
        .then((result) => {
            let formulario = formateDataToOld(result);
            formulario = Mapeo(formulario);

        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    InitProcess,
    InitProcessSinRequest,
    InitProcessSearchBase
};

InitProcessSearchBase();