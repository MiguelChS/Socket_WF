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
        environment: [],
        cambiopidpad: [],
        logistic: [],
        memoriafiscal: [],
        mantenimiento: [],
        visitas: [],
        tecladoencryptor: [],
        devolucionpartes: [],
        recategorizacion: []
    }

    array.forEach((form) => {
        let objForm = JSON.parse(form.jsonForm);
        objForm.data = JSON.parse(objForm.data);
        let FormParse = {
            "formid": objForm.id,
            "txtfecha": objForm.data["date"],
            "csrcode": objForm.data["csrCode"],
            "enviado": !!form.enviado,
            "appversion": objForm.data["appVersion"],
            "author": `${objForm.data["qlookid"]}@ncr.com`,
        }
        switch (objForm.idFormType) {
            case "1": {
                formulario.environment.push(Object.assign({}, FormParse, {

                    "txtidatm": objForm.data["3"],
                    "selcliente": objForm.data["13"],
                    "txtwo": objForm.data["1"],
                    "txtserie": objForm.data["2"],

                    "chkproelectrico": !!Object.keys(objForm.data["7"]).length,
                    "chkvolnoregulado": !!(Object.keys(objForm.data["7"]).length && Object.keys(objForm.data["7"]["1"]).length),
                    "txtfn": Object.keys(objForm.data["7"]).length && Object.keys(objForm.data["7"]["1"]).length ? objForm.data["7"]["1"]["fn"] : "",
                    "txtft": Object.keys(objForm.data["7"]).length && Object.keys(objForm.data["7"]["1"]).length ? objForm.data["7"]["1"]["ft"] : "",
                    "txtnt": Object.keys(objForm.data["7"]).length && Object.keys(objForm.data["7"]["1"]).length ? objForm.data["7"]["1"]["nt"] : "",
                    "chknoups": Object.keys(objForm.data["7"]).length ? objForm.data["7"]["2"] : false,
                    "chknotierrafisica": Object.keys(objForm.data["7"]).length ? objForm.data["7"]["3"] : false,
                    "chknoenergia": Object.keys(objForm.data["7"]).length ? objForm.data["7"]["4"] : false,
                    
                    "chkprosite": !!Object.keys(objForm.data["8"]).length,
                    "chksuciedad": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["1"] : false,
                    "chkgoteras": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["2"] : false,
                    "chkplagas": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["3"] : false,
                    "chkexpsol": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["4"] : false,
                    "chkhumedad": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["5"] : false,
                    "chkmalailuminacion": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["6"] : false,
                    "chknoaa": Object.keys(objForm.data["8"]).length ? objForm.data["8"]["7"] : false,

                    "chkprocomms": !!objForm.data["9"],
                    "selcomunicaciones": objForm.data["9"],

                    "chkprooperativo": !!Object.keys(objForm.data["10"]).length,
                    "chksininsumos": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["1"] : false,
                    "chksinbilletes": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["2"] : false,
                    "chkmalacalidadbilletes": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["3"] : false,
                    "chkmalacalidadinsumos": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["4"] : false,
                    "chkerroroperador": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["5"] : false,
                    "chkcargainccaseteras": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["6"] : false,
                    "chkcargaincpapel": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["7"] : false,
                    "chkerrorbalanceo": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["8"] : false,
                    "chksupervisor": Object.keys(objForm.data["10"]).length ? objForm.data["10"]["9"] : false,


                    "chkprovandalismo": objForm.data["11"],
                    "chkprootros": objForm.data["12"],

                    "chkprofotos": !!objForm.data["14"].length,
                    "txtcomentario": objForm.data["6"],
                    "foto1": objForm.data["14"][0] ? objForm.data["14"][0] : null,
                    "foto2": objForm.data["14"][1] ? objForm.data["14"][1] : null,
                    "foto3": objForm.data["14"][2] ? objForm.data["14"][2] : null,
                    "foto4": objForm.data["14"][3] ? objForm.data["14"][3] : null,
                    "txtparte": objForm.data["5"],
                    "txtcontacto": objForm.data["4"],
                    "cliente": objForm.data["13"],

                    "txtcsrcode": objForm.data["csrCode"]
                }))
                break;
            }
            case "2": {
                formulario.cambiopidpad.push(Object.assign({}, FormParse, {
                    "workorder": objForm.data["21"],
                    "custref": objForm.data["22"],
                    "sitename": objForm.data["23"],
                    "seriesaliente": objForm.data["25"],
                    "serieentrante": objForm.data["26"],
                    "nropos": objForm.data["24"],
                    "foto1": objForm.data["27"][0] ? objForm.data["27"][0] : null,
                    "foto2": objForm.data["27"][1] ? objForm.data["27"][1] : null,
                    "foto3": objForm.data["27"][2] ? objForm.data["27"][2] : null,
                    "foto4": objForm.data["27"][3] ? objForm.data["27"][3] : null,
                }))
                break;
            }
            case "3": {
                formulario.logistic.push(Object.assign({}, FormParse, {
                    "txtwo": objForm.data["31"],
                    "txtparte": objForm.data["32"],
                    "txtcsrcode": "AR101H90",////objForm.data["csrCode"]
                    "txtreparador": objForm.data["35"],
                    "txtretorno": objForm.data["34"],
                    "txtcomentario": objForm.data["36"],
                    "chkprofotos": !!objForm.data["37"].length,
                    "foto1": objForm.data["37"][0] ? objForm.data["37"][0] : null,
                    "foto2": objForm.data["37"][1] ? objForm.data["37"][1] : null,
                    "foto3": objForm.data["37"][2] ? objForm.data["37"][2] : null,
                    "foto4": objForm.data["37"][3] ? objForm.data["37"][3] : null,
                }))
                break;
            }
            case "4": {
                formulario.memoriafiscal.push(Object.assign({}, FormParse, {
                    "workorder": objForm.data["41"],
                    "serie": objForm.data["42"],
                    "idequipo": null,
                    "cliente": objForm.data["43"],
                    "custref": objForm.data["44"],
                    "sitename": objForm.data["45"],
                    "nropuntoventa": objForm.data["46"],
                    "verfirmplacafiscal": objForm.data["47"],
                    "serieimpresora": objForm.data["48"],
                    "foto1": objForm.data["49"][0] ? objForm.data["49"][0] : null,
                    "foto2": objForm.data["49"][1] ? objForm.data["49"][1] : null,
                    "foto3": objForm.data["49"][2] ? objForm.data["49"][2] : null,
                    "foto4": objForm.data["49"][3] ? objForm.data["49"][3] : null
                }))
                break;
            }
            case "5": {
                formulario.mantenimiento.push(Object.assign({}, FormParse, {
                    "txtwo": objForm.data["51"],
                    "txtequipo": objForm.data["53"],
                    "txtserial": objForm.data["52"],
                    "txtfechamp": objForm.data["55"],
                    "txtcomentario": objForm.data["56"],
                    "chkprofotos": !!objForm.data["57"].length,
                    "foto1": objForm.data["57"][0] ? objForm.data["57"][0] : null,
                    "foto2": objForm.data["57"][1] ? objForm.data["57"][1] : null,
                    "foto3": objForm.data["57"][2] ? objForm.data["57"][2] : null,
                    "foto4": objForm.data["57"][3] ? objForm.data["57"][3] : null,
                    "txtcsrcode": objForm.data["csrCode"],
                    "cliente": objForm.data["54"],
                    "selcliente": objForm.data["54"]
                }))
                break;
            }
            case "6": {
                formulario.visitas.push(Object.assign({}, FormParse, {
                    "txtwo": objForm.data["61"],
                    "txtequipo": objForm.data["64"],
                    "txtserial": objForm.data["63"],
                    "txtfechavi": objForm.data["65"],
                    "chkprofotos": !!objForm.data["66"].length,
                    "foto1": objForm.data["66"][0] ? objForm.data["66"][0] : null,
                    "foto2": objForm.data["66"][1] ? objForm.data["66"][1] : null,
                    "foto3": objForm.data["66"][2] ? objForm.data["66"][2] : null,
                    "foto4": objForm.data["66"][3] ? objForm.data["66"][3] : null,
                    "txtcsrcode": objForm.data["csrCode"],
                    "cliente": objForm.data["62"],
                    "selcliente": objForm.data["62"]
                }))
                break;
            }
            case "7": {
                formulario.tecladoencryptor.push(Object.assign({}, FormParse, {
                    "workorder": objForm.data["71"],
                    "serie": objForm.data["74"],
                    "motivodanio": objForm.data["75"],
                    "comentario": objForm.data["76"],
                    "selcliente": objForm.data["72"],
                    "equipo": objForm.data["73"],
                    "cliente": objForm.data["72"],
                    "foto1": null,
                    "foto2": null,
                    "foto3": null,
                    "foto4": null
                }))
                break;
            }
            case "8": {
                formulario.devolucionpartes.push(Object.assign({}, FormParse, {
                    "warehouse": objForm.data["81"],
                    "localidad": objForm.data["82"],
                    "txtfecha": objForm.data["83"],

                    "gng": objForm.data["85"].hasOwnProperty("guia"),
                    "oca": objForm.data["85"].hasOwnProperty("ordenRetiro"),
                    "guia": objForm.data["85"].hasOwnProperty("guia") ? objForm.data["85"]["guia"] : "",
                    "empresa": objForm.data["85"].hasOwnProperty("guia") ? objForm.data["85"]["empresa"] : "",
                    "ordenretiro": objForm.data["85"].hasOwnProperty("ordenRetiro") ? objForm.data["85"]["ordenRetiro"] : "",

                    "foto1": objForm.data["87"][0] ? objForm.data["87"][0] : null,
                    "foto2": objForm.data["87"][1] ? objForm.data["87"][1] : null,
                    "foto3": objForm.data["87"][2] ? objForm.data["87"][2] : null,
                    "foto4": objForm.data["87"][3] ? objForm.data["87"][3] : null,
                    "guiadhl": objForm.data["84"],
                    "cliente": null,
                    "partes": objForm.data["86"].map(x => {
                        return {
                            "formid": objForm.id,
                            "parte": x.nroParte,
                            "descripcion": x.descripcion,
                            "cantidad": x.cantidad,
                            "estado": x.estado,
                            "workorder": x.workOrde
                        }
                    })
                }))
                break;
            }
            case "9": {
                formulario.recategorizacion.push(Object.assign({}, FormParse, {
                    "workOrder": objForm.data["91"],
                    "nroEquipo": objForm.data["92"],
                    "custRefNum": objForm.data["94"],
                    "comentario": objForm.data["95"],
                    "falla": objForm.data["96"],
                    "cliente": objForm.data["93"],
                    "fechaCreacion": objForm.data["date"]
                }))
                break;
            }
        }
    });

    return formulario;
}

function InitProcessSearchBase() {
    return new Promise((resolve,reject)=>{
        repoFormulario.GetJsonForm()
        .then((result) => {
            let formulario = formateDataToOld(result);
            formulario = Mapeo(formulario);
            ArmadoMail(formulario)
                .then(resultFormConMail => EnvioMails(resultFormConMail))
                .then((result) => {
                    let Errores = result.filter(x => x.err)
                    if (Errores.length) {
                        EnvioError(JSON.stringify(Errores))
                    }
                    resolve();
                })
                .catch((err) => {
                    if (err.hasOwnProperty('stack')) {
                        EnvioError(err.stack)
                    } else {
                        EnvioError(JSON.stringify(err))
                    }
                    resolve();
                })
        })
        .catch((err) => {
            EnvioError(err.message)
            resolve()
        })  
    })
}

module.exports = {
    InitProcess,
    InitProcessSinRequest,
    InitProcessSearchBase
};