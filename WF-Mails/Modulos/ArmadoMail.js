let repoForm = require("../Repository/RepositoryFormulario");
let repoContac = require("../Repository/RepositoryContacto");
let Mapper = require("../Entidades/MapperEntidades");
let jade = require("jade");

function buscarFormulario(form) {
    return new Promise((resolve, reject) => {
        if (form.nameForm.value === 'Recategorizacion') {
            resolve({
                formid: form.formid.value,
                exists: false
            })
            return;
        }
        repoForm.getFormulario(form.formid.value, form.tablaName.value)
            .then((result) => {
                let resultForm = {
                    formid: form.formid.value,
                    exists: result.length > 0
                }
                resolve(resultForm)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function Verificar(formularios) {
    let arrayPromise = [];
    formularios.forEach((form) => {
        arrayPromise.push(buscarFormulario(form));
    });
    return new Promise((resolve, reject) => {
        Promise.all(arrayPromise)
            .then((result) => {
                //Mapeamos el resultado
                resolve(formularios.map(form => {
                    form.exists.value = result.find(r => r.formid == form.formid.value).exists
                    return form;
                }));
            })
            .catch((err) => {
                reject(err)
            })
    })
}

function getContactos(form) {
    //solo para brasil Visitas caso especial
    if (form.tablaName.value == 'VISITAS' && form.csrcode.value.substr(0, 2) == 'BR') {
        return new Promise((resolve, reject) => {
            resolve({
                formid: form.formid.value,
                contacto: [{ mail: 'BC230020@ncr.com' }]
            })
        })
    }
    //solo para recategorizacion
    if (form.tablaName.value == 'RECATEGORIZACION') {
        return new Promise((resolve, reject) => {
            //CI230114@ncr.com
            resolve({
                formid: form.formid.value,
                contacto: [{ mail: 'gm230032@ncr.com,jn185090@ncr.com' }]
            })
        })
    }
    //para los casos normales
    switch (form.tablaName.value) {
        case "CAMBIOPIDPAD":
            {
                return new Promise((resolve, reject) => {
                    repoContac.GetContactoCambioPidPad()
                        .then(result => resolve({
                            formid: form.formid.value,
                            contacto: result
                        }))
                        .catch(err => reject(err))
                })
            }
        case "DEVOLUCIONPARTES":
            {
                return new Promise((resolve, reject) => {
                    repoContac.GetContactoDevolucion(form.gng.value, form.csrcode.value.substr(0, 6))
                        .then(result => resolve({
                            formid: form.formid.value,
                            contacto: result
                        }))
                        .catch(err => reject(err))
                })
            }
        case "LOGISTIC":
            {
                return new Promise((resolve, reject) => {
                    repoContac.GetContactoLogistic(form.csrcode.value.substr(0, 2), form.csrcode.value.substr(0, 6))
                        .then(result => resolve({
                            formid: form.formid.value,
                            contacto: result
                        }))
                        .catch(err => reject(err))
                })

            }
        case "MEMORIAFISCAL":
            {
                return new Promise((resolve, reject) => {
                    repoContac.GetContactoMemoriaFiscal(form.cliente.value)
                        .then(result => resolve({
                            formid: form.formid.value,
                            contacto: result
                        }))
                        .catch(err => reject(err))
                })

            }
        default:
            {
                return new Promise((resolve, reject) => {
                    repoContac.GetContacto(form.cliente.value, form.csrcode.value.substr(0, 6), form.csrcode.value.substr(0, 2))
                        .then(result => resolve({
                            formid: form.formid.value,
                            contacto: result
                        }))
                        .catch(err => reject(err))
                })

            }
    }
}

function contactos(formularios) {
    return new Promise((resolve, reject) => {
        let arrayPromise = [];
        formularios.forEach(form => {
            if (form.exists.value) {
                arrayPromise.push(getContactos(form))
            } else {
                if (!form.enviado.value) {
                    arrayPromise.push(getContactos(form))
                }
            }
        })

        Promise.all(arrayPromise)
            .then((result) => {
                resolve(formularios.map(form => {
                    let contacto = result.find(r => r.formid == form.formid.value);
                    form.Contactos.value = contacto ? contacto.contacto : null;
                    return form;
                }))
            })
            .catch(err => reject(err));
    })
}

function buscarNombreTablaParaElLink(nombreFormulario) {
    switch (nombreFormulario) {
        case "CAMBIOPIDPAD":
            {
                return "cambioPidPad";
            }
        case "DEVOLUCIONPARTES":
            {
                return "devolucionPartes"
            }
        case "ENVIRONMENT":
            {
                return "environment"
            }
        case "LOGISTIC":
            {
                return "logistic"
            }
        case "MANTENIMIENTO":
            {
                return "mantenimiento"
            }
        case "MEMORIAFISCAL":
            {
                return "memoriaFiscal"
            }
        case "TECLADOENCRYPTOR":
            {
                return "tecladoEncryptor"
            }
        case "VISITAS":
            {
                return "visitaTecnica"
            }
    }
}

function html(form) {
    let fn = jade.compileFile('./Layout.jade');
    let formulario = form;
    let link = `http://lnxsrv01/webforms?tabla=${buscarNombreTablaParaElLink(form.tablaName.value)}&id=${form.formid.value}`;
    if (form.tablaName.value == 'ENVIRONMENT') {
        formulario = Mapper.viewEnvironment(formulario);
    }
    let variableRender = {
        typeForm: form.tablaName.value,
        nameForm: form.nameForm.value,
        form: formulario,
        link: link
    }
    return fn(variableRender);
}

function agruparFotosFormulario(form) {
    let attachments = [];
    for (let i = 1; i <= 4; i++) {
        let foto = `foto${i}`;
        if (form[foto].value !== null) {
            let nameFoto = `${form.formid.value}-${i}.jpg`;
            attachments.push({
                filename: nameFoto,
                path: `data:image/jpg;base64,${form[foto].value}`
            });
            form[foto].setNamePhoto(nameFoto);
        }
    };
    return attachments;
}

function subject(form) {
    return new Promise((resolve, reject) => {
        let result = {
            formid: form.formid.value,
            subject: `Nuevo Formulario ${form.nameForm.value}`
        };
        switch (form.tablaName.value) {
            case "VISITAS":
                {
                    if (form.csrcode.value.substr(0, 2) == 'BR') {
                        result.subject = `${form.nameForm.value} --- ${form.txtwo.value}`;
                    }
                    resolve(result)
                    break;
                }
            case "DEVOLUCIONPARTES":
                {
                    repoContac.getSubjectDevolucion(form.csrcode.value)
                    .then(subject => {
                        if (subject.length) {
                            result.subject += ` ${subject[0].localidad}`
                        }
                        resolve(result)
                    })
                    .catch(err => {
                        reject(err);
                    })
                    break;
                }
            default:
                {
                    resolve(result)
                }
        }
    })
}

function bodyMail(formulario) {
    return new Promise((resolve, reject) => {
        let arrayPromise = [];
        formulario.forEach(form => {
            if (!form.exists.value && !form.enviado.value) {
                arrayPromise.push(subject(form));
            }
        })
        Promise.all(arrayPromise)
            .then(result => {
                resolve(formulario.map(form => {
                    if (!form.exists.value && !form.enviado.value) {
                        form.bodyMail.value = {
                            from: form.author.value,
                            html: html(form),
                            subject: result.find(sub => sub.formid == form.formid.value).subject,
                            to: `${form.Contactos.getConcatenado()},${form.author.value}`,
                            attachments: agruparFotosFormulario(form)
                        }
                    }
                    return form;
                }))
            })
            .catch(err => {
                reject(err);
            })
    })
}

function ArmarMail(formularios) {
    return new Promise((resolve, reject) => {
        Verificar(formularios)
            .then(resultConVerificacion => contactos(resultConVerificacion))
            .then(resultConContactos => bodyMail(resultConContactos))
            .then(resultConBodyMail => resolve(resultConBodyMail))
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = ArmarMail;