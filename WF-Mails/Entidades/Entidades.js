/**
 * Created by mc185249 on 25/08/2016.
 */
let moment = require("moment");

function convertDateTime(value) {
    return moment.utc(value).format("DD-MM-YYYY HH:mm");
};

function convertDate(value) {
    return moment.utc(value).format("DD-MM-YYYY");
};

function convertDateSql(value) {
    return moment.utc(value).format("YYYY-MM-DD HH:mm");
};

function buildPartes(value) {
    if (!Array.isArray(value) || value.length == 0) return null;
    let arrayParte = [];
    for (let i = 0; i < value.length; i++) {
        arrayParte.push(value[i]);
    }
    return arrayParte;
}

let Entidad = {
    formulario: {
        formid: {
            label: "Nro Formulario",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        foto1: {
            label: null,
            value: null,
            namePhoto: null,
            set: function(value) {
                this.value = value;
            },
            setNamePhoto: function(name) {
                this.namePhoto = name;
            }
        },
        foto2: {
            label: null,
            value: null,
            namePhoto: null,
            set: function(value) {
                this.value = value;
            },
            setNamePhoto: function(name) {
                this.namePhoto = name;
            }
        },
        foto3: {
            label: null,
            value: null,
            namePhoto: null,
            set: function(value) {
                this.value = value;
            },
            setNamePhoto: function(name) {
                this.namePhoto = name;
            }
        },
        foto4: {
            label: null,
            value: null,
            namePhoto: null,
            set: function(value) {
                this.value = value;
            },
            setNamePhoto: function(name) {
                this.namePhoto = name;
            }
        },
        txtfecha: {
            label: "Fecha emision",
            type: "date",
            valueOriginal: null,
            value: null,
            set: function(value) {
                this.valueOriginal = convertDateSql(value);
                this.value = convertDateTime(value);
            }
        },
        author: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        cliente: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        csrcode: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        enviado: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        insertSql: {
            value: null
        },
        exists: {
            value: false
        },
        Contactos: {
            value: null,
            getConcatenado: function() {
                if (!Array.isArray(this.value)) return '';
                let joinConcat = '';
                this.value.forEach(contacto => {
                    joinConcat += `${contacto.mail},`;
                });
                return joinConcat.substr(0, joinConcat.length - 1);
            }
        },
        bodyMail: {
            value: null
        }
    },
    cambiopidpad: {
        tablaName: {
            value: "CAMBIOPIDPAD",
        },
        nameForm: {
            value: "Cambio Pin Pad",
        },
        workorder: {
            label: "Work Order",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        custref: {
            label: "Customn Reference",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        sitename: {
            label: "Site Name",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        seriesaliente: {
            label: "Serie Saliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        serieentrante: {
            label: "Serie Entrante",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        nropos: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    devolucionpartes: {
        tablaName: {
            value: "DEVOLUCIONPARTES",
        },
        nameForm: {
            value: "Devolucion de partes",
        },
        warehouse: {
            label: "Warehouse",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        localidad: {
            label: "Localidad",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        gng: {
            label: "GNG",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        oca: {
            label: "OCA",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        guia: {
            label: "Guia",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        empresa: {
            label: "Empresa",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        ordenretiro: {
            label: "Oder de Retiro",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        guiadhl: {
            label: "Guia DHL",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        partes: {
            label: "",
            value: null,
            set: function(value) {
                this.value = buildPartes(value);
            }
        }
    },
    environment: {
        tablaName: {
            value: "ENVIRONMENT",
        },
        nameForm: {
            value: "Environment",
        },
        txtcsrcode: {
            label: "Csr Code",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtidatm: {
            label: "idatm",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        selcliente: {
            label: "Cliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtwo: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtserie: {
            label: "Serie",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkproelectrico: {
            label: "Problema Electronico",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkvolnoregulado: {
            label: "Volumen no regulado",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtfn: {
            label: "FN",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtft: {
            label: "FT",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtnt: {
            label: "NT",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chknoups: {
            label: "No UPs",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chknotierrafisica: {
            label: "No tierra fisica",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chknoenergia: {
            label: "No energia",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprosite: {
            label: "Problema Site",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chksuciedad: {
            label: "Suciedad",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkgoteras: {
            label: "Goteras",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkplagas: {
            label: "Plagas",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkexpsol: {
            label: "Exposicion al Sol",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkhumedad: {
            label: "Humedad",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkmalailuminacion: {
            label: "Mala Iluminacion",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chknoaa: {
            label: "Noaa",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprocomms: {
            label: "Problema de comunicacion",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        selcomunicaciones: {
            label: "Comunicacion",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprooperativo: {
            label: "Problema Operativo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chksininsumos: {
            label: "Sin Insumo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chksinbilletes: {
            label: "sin billetes",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkmalacalidadbilletes: {
            label: "Mala calidad de Billetes",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkmalacalidadinsumos: {
            label: "Mala calidad de insumos",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkerroroperador: {
            label: "error de operador",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkcargaincpapel: {
            label: "Cagar papel",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkcargainccaseteras: {
            label: "Carga casetera",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chksupervisor: {
            label: "supervisor",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkerrorbalanceo: {
            label: "error de balanceo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprovandalismo: {
            label: "problema de vandalismo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprootros: {
            label: "otros problemas",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprofotos: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcomentario: {
            label: "Comentario",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        appversion: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcontacto: {
            label: "Contacto",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtparte: {
            label: "Parte",
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    logistic: {
        tablaName: {
            value: "LOGISTIC",
        },
        nameForm: {
            value: "Logistic",
        },
        txtcsrcode: {
            label: "Csr Code",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtwo: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtparte: {
            label: "Parte",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtreparador: {
            label: "Reparador",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtretorno: {
            label: "Retorno",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        chkprofotos: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcomentario: {
            label: "Comentario",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        appversion: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    mantenimiento: {
        tablaName: {
            value: "MANTENIMIENTO",
        },
        nameForm: {
            value: "Mantenimiento",
        },
        selcliente: {
            label: "Cliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcsrcode: {
            label: "CsrCode",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtwo: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtequipo: {
            label: "Equipo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtserial: {
            label: "Serial",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtfechamp: {
            label: "Fecha Mantenimiento",
            value: null,
            valueOriginal: null,
            type: "date",
            set: function(value) {
                this.valueOriginal = convertDateSql(value);
                this.value = convertDateTime(value);
            }
        },
        chkprofotos: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcomentario: {
            label: "Comentarios",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        appversion: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    memoriafiscal: {
        tablaName: {
            value: "MEMORIAFISCAL",
        },
        nameForm: {
            value: "Memoria Fiscal",
        },
        workorder: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        serie: {
            label: "Serie",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        idequipo: {
            label: "Equipo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        cliente: {
            label: "Cliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        custref: {
            label: "Cust Ref",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        sitename: {
            label: "Site Name",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        nropuntoventa: {
            label: "Nro Punto Vente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        verfirmplacafiscal: {
            label: "Ver Firma Placa Fiscal",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        serieimpresora: {
            label: "Serie Impresora",
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    tecladoencryptor: {
        tablaName: {
            value: "TECLADOENCRYPTOR",
        },
        nameForm: {
            value: "Teclado Encryptor",
        },
        workorder: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        selcliente: {
            label: "Cliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        serie: {
            label: "Serie",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        motivodanio: {
            label: "Motivo de da�o",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        comentario: {
            label: "Comentario",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        equipo: {
            label: "Equipo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    visitas: {
        tablaName: {
            value: "VISITAS",
        },
        nameForm: {
            value: "Visitas",
        },
        selcliente: {
            label: "Cliente",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtcsrcode: {
            label: "Csr code",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtwo: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtequipo: {
            label: "Equipo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtserial: {
            label: "Serial",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        txtfechavi: {
            label: "Fecha visita",
            value: null,
            valueOriginal: null,
            type: "date",
            set: function(value) {
                this.valueOriginal = convertDateSql(value);
                this.value = convertDate(value);
            }
        },
        chkProFotos: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        appversion: {
            label: null,
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    },
    recategorizacion: {
        tablaName: {
            value: "RECATEGORIZACION",
        },
        nameForm: {
            value: "Recategorizacion",
        },
        workorder: {
            label: "WorkOrder",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        numeroEquipo: {
            label: "Numero de Equipo",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        custRefNum: {
            label: "CustRef#",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        comentario: {
            label: "Comentario",
            value: null,
            set: function(value) {
                this.value = value;
            }
        },
        falla: {
            label: "Falla",
            value: null,
            set: function(value) {
                this.value = value;
            }
        }
    }
};

/**
 * @return {null}
 */
function Entidades(tipoForm) {
    if (!Entidad.hasOwnProperty(tipoForm)) return null;
    //formulario sin referencia;
    let formulario = Object.assign({}, Entidad.formulario);
    for (let attr in formulario) {
        formulario[attr] = Object.assign({}, formulario[attr])
    }
    let tipoFormulario = Object.assign({}, Entidad[tipoForm]);
    for (let attr in tipoFormulario) {
        tipoFormulario[attr] = Object.assign({}, tipoFormulario[attr])
    }
    return Object.assign({}, formulario, tipoFormulario)
}
module.exports = Entidades;