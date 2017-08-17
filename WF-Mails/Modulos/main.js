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
    let formulario = {
        environment:[],
        cambiopidpad:[],
        logistic:[],
        memoriafiscal:[],
        mantenimiento:[],
        visitas:[],
        tecladoencryptor:[],
        devolucionpartes:[],
        recategorizacion:[]
    }

    array.forEach((form) => {
        let objForm = JSON.parse(form.jsonForm);
        objForm.data = JSON.parse(form.jsonForm);
        console.log(objForm);
        switch (objForm.FormType) {
            case "1": {
                formulario.environment.push(
                    {
                        "formid": objForm.id,
                        "txtfecha": objForm.data["date"],
                        "txtcsrcode": objForm.data["csrCode"],
                        "txtidatm": objForm.data[""],
                        "selcliente": objForm.data["13"],
                        "txtwo": objForm.data["1"],
                        "txtserie": objForm.data["2"],

                        "chkproelectrico": !!Object.keys(objForm.data["7"]).length,
                        "chkvolnoregulado": Object.keys(objForm.data["7"]).length && Object.keys(objForm.data["7"]["1"] ? ),
                        "txtfn": "",
                        "txtft": "",
                        "txtnt": "",
                        "chknoups": false,
                        "chknotierrafisica": false,
                        "chknoenergia": false,

                        "chkprosite": false,
                        "chksuciedad": false,
                        "chkgoteras": false,
                        "chkplagas": false,
                        "chkexpsol": false,
                        "chkhumedad": false,
                        "chkmalailuminacion": false,
                        "chknoaa": false,
                        "chkprocomms": false,
                        "selcomunicaciones": objForm.data["9"],
                        "chkprooperativo": false,
                        "chksininsumos": false,
                        "chksinbilletes": false,
                        "chkmalacalidadbilletes": false,
                        "chkerroroperador": false,
                        "chkcargaincpapel": false,
                        "chkcargainccaseteras": false,
                        "chksupervisor": false,
                        "chkerrorbalanceo": false,
                        "chkprovandalismo": objForm.data["11"],
                        "chkprootros": objForm.data["12"],
                        "chkprofotos": false,
                        "txtcomentario": objForm.data["6"],
                        "foto1": null,
                        "foto2": null,
                        "foto3": null,
                        "foto4": null,
                        "txtparte": objForm.data["5"],
                        "txtcontacto": objForm.data["4"],
                        "appversion": objForm.data["appversion"],
                        "author": objForm.data["author"],
                        "chkmalacalidadinsumos": false,
                        "cliente": objForm.data["13"],
                        "csrcode": objForm.data["csrCode"],
                        "enviado": form.enviado
                    }
                )
                break;
            }
            case "2": {
                break;
            }
            case "3": {
                break;
            }
            case "4": {
                break;
            }
            case "5": {
                break;
            }
            case "6": {
                break;
            }
            case "7": {
                break;
            }
            case "8": {
                break;
            }
            case "9": {
                break;
            }
        }
    });
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