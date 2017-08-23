let repoPostgres = require('../Repository/RepositoryPostgres');
let repoFormulario = require('../Repository/RepositoryFormulario');
let email = require('./SendEmail');
var ftp = require("./FTPImagen");


function actulizarEstadoPostgres(form, envio, sql, estado) {
    if (form.tablaName.value == "RECATEGORIZACION") {
        return new Promise((resolve) => resolve())
    }
    return new Promise((resolve, reject) => {
        form.enviado.value = envio;
        form.insertSql.value = sql;
        repoPostgres.updatePostgres(form, null)
            .then(result => resolve())
            .catch(err => {
                estado.err = err.stack;
                estado.proceso = "ACTULIZANDO ESTADO DE FORMULARIO EN POSTGRES";
                reject(estado)
            })
    })
}

function subirFoto(foto, name) {
    return new Promise((resolve, reject) => {
        ftp.Update({ imagen: foto, name: name }, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}

function subirFotos(form, estado) {
    let arrayPromise = [];
    for (let i = 1; i < 5; i++) {
        if (form[`foto${i}`].value) {
            let name = `${form.formid.value}-${i}.jpg`;
            form[`foto${i}`].setNamePhoto(name);
            arrayPromise.push(subirFoto(new Buffer(form[`foto${i}`].value, 'base64'), name))
        }
    }
    return new Promise((resolve, reject) => {
        Promise.all(arrayPromise)
            .then(() => resolve())
            .catch((err) => {
                estado.err = err;
                estado.proceso = "SUBIENDO FOTOS"
                reject(estado);
            })
    })

}

function enviarMail(form, estado) {
    return new Promise((resolve, reject) => {
        //para testiar
        email.send(form.bodyMail.value, (err) => {
            if (err) {
                estado.err = err.stack;
                estado.proceso = "ENVIANDO MAIL"
                reject(estado)
                return;
            }
            repoFormulario.updateJsonForm(form.formid.value)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    estado.err = err.stack;
                    estado.proceso = "ACTULIZANDO EL ESTADO DE ENVIO "
                    reject(estado)
                })
        })
    })
}

function insertarFormulario(form, estado) {
    switch (form.tablaName.value) {
        case "RECATEGORIZACION":
            {
                return new Promise((resolve) => resolve())
            }
        case "DEVOLUCIONPARTES":
            {
                return new Promise((resolve, reject) => {
                    repoFormulario.insertFormDevolucionParte(form)
                        .then(() => resolve())
                        .catch(err => {
                            estado.err = err.stack;
                            estado.proceso = "INSERTANDO FORMULARIO"
                            reject(estado);
                        })
                })
            }
        default:
            {
                return new Promise((resolve, reject) => {
                    repoFormulario.insertFormulario(form)
                        .then(() => resolve())
                        .catch(err => {
                            estado.err = err.stack;
                            estado.proceso = "INSERTANDO FORMULARIO"
                            reject(estado);
                        })
                })
            }
    }
}

//para el caso que se haya enviado pero no se haya insertado en el sql server
function subirInsetarActulizar(form) {
    let estadoProceso = {
        formid: form.formid.value,
        TipoFormulario: form.tablaName.value,
        err: null,
        proceso: null
    }
    return new Promise((resolve, reject) => {
        subirFotos(form, estadoProceso)
            .then(() => insertarFormulario(form, estadoProceso))
            .then(() => deleteForm(form, estadoProceso)/*actulizarEstadoPostgres(form, true, true, estadoProceso)*/)
            .then(() => resolve(estadoProceso))
            .catch(err => {
                resolve(err);
            })
    })
}
//para el caso que no se actulizo el estado del formulario en protgres

function soloActulizarPostgres(form) {
    let estadoProceso = {
        formid: form.formid.value,
        TipoFormulario: form.tablaName.value,
        err: null,
        proceso: null
    }
    return new Promise((resolve, reject) => {
        actulizarEstadoPostgres(form, true, true, estadoProceso)
            .then(() => resolve(estadoProceso))
            .catch(err => {
                resolve(err);
            })
    })
}
//nueva version eliminamos el formulario que ya se inserto
function deleteForm(form, estado) {
    return new Promise((resolve, reject) => {
        repoFormulario.deleteFormJson(form.formid.value)
            .then(() => resolve())
            .catch(err => {
                estado.err = err.stack;
                estado.proceso = "ELIMINAR FORM_JSON";
                reject(estado);
            })
    })

}

function deleteFormInsertado(form) {
    let estadoProceso = {
        formid: form.formid.value,
        TipoFormulario: form.tablaName.value,
        err: null,
        proceso: null
    }
    return new Promise((resolve, reject) => {
        deleteForm(form, estadoProceso)
            .then(() => resolve(estadoProceso))
            .catch(err => {
                resolve(err);
            })
    })


}
//para el caso que normal envio subida y inserte actulizacion
function enviarSubirInsetarActulizar(form) {
    let estadoProceso = {
        formid: form.formid.value,
        TipoFormulario: form.tablaName.value,
        err: null,
        proceso: null
    }
    return new Promise((resolve, reject) => {
        enviarMail(form, estadoProceso)
            .then(() => subirFotos(form, estadoProceso))
            .then(() => insertarFormulario(form, estadoProceso))
            .then(() => deleteForm(form, estadoProceso))
            .then(() => resolve(estadoProceso))
            .catch(err => {
                resolve(err);
            })
    })
}

function EnvioMails(formularios) {
    let arrayPromise = [];
    formularios.forEach((form) => {
        if (form.exists.value) {
            //actulizar el estado del mail en postgres
            //arrayPromise.push(soloActulizarPostgres(form))
            //eliminamos el formulario
            console.log("existe Eliminarme")
            arrayPromise.push(deleteFormInsertado(form));
        } else {
            if (form.enviado.value) {
                //subimos las fotos y insertamos el formulario en el sqlServer
                console.log("subit y insertarme eliminar")
                arrayPromise.push(subirInsetarActulizar(form));
            } else {
                //enviamos mail subimos fotos y insertamos sql
                console.log("enviar subir insertar eliminar")
                arrayPromise.push(enviarSubirInsetarActulizar(form))
            }
        }
    });
    return Promise.all(arrayPromise);
}

module.exports = EnvioMails;