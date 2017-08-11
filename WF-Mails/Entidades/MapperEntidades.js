var Entidad = require("./Entidades");

function Mapper(formulario, tipo) {
    //obtenemos la entidad
    let entidad = Entidad(tipo);
    //cargamos los datos
    for (let attr in formulario) {
        if (!entidad.hasOwnProperty(attr)) continue;
        entidad[attr].set(formulario[attr]);
    }
    return entidad;
}

function viewEnvironment(formEnvir) {
    let nuevoForm = {
        formid: {
            label: "Nro Formulario",
            value: formEnvir.formid.value
        },
        txtfecha: {
            label: "Fecha emision",
            value: formEnvir.txtfecha.value
        },
        txtcsrcode: {
            label: "Csr Code",
            value: formEnvir.txtcsrcode.value
        },
        txtwo: {
            label: "WorkOrder",
            value: formEnvir.txtwo.value
        },
        txtserie: {
            label: "Serie",
            value: formEnvir.txtserie.value
        },
        txtidatm: {
            label: "idatm",
            value: formEnvir.txtidatm.value
        },
        selcliente: {
            label: "Cliente",
            value: formEnvir.selcliente.value
        },
        txtcontacto: {
            label: "Contacto",
            value: formEnvir.txtcontacto.value
        },
        txtparte: {
            label: "Parte",
            value: formEnvir.txtparte.value
        },
        txtcomentario: {
            label: "Comentario",
            value: formEnvir.txtcomentario.value
        },
        chkproelectrico: {
            label: "Problema Electronico",
            check: formEnvir.chkproelectrico.value,
            value: {
                chkvolnoregulado: {
                    label: "voltaje no regulado",
                    check: formEnvir.chkvolnoregulado.value,
                    value: {
                        txtfn: {
                            label: "FN",
                            value: formEnvir.txtfn.value
                        },
                        txtft: {
                            label: "FT",
                            value: formEnvir.txtft.value
                        },
                        txtnt: {
                            label: "NT",
                            value: formEnvir.txtnt.value
                        },
                    }
                },
                chknoups: {
                    label: "No UPs",
                    value: formEnvir.chknoups.value
                },
                chknotierrafisica: {
                    label: "No tierra fisica",
                    value: formEnvir.chknotierrafisica.value
                },
                chknoenergia: {
                    label: "No energia",
                    value: formEnvir.chknoenergia.value
                }
            }
        },
        chkprosite: {
            label: "Problema Site",
            check: formEnvir.chkprosite.value,
            value: {
                chksuciedad: {
                    label: "Suciedad",
                    value: formEnvir.chksuciedad.value
                },
                chkgoteras: {
                    label: "Goteras",
                    value: formEnvir.chkgoteras.value
                },
                chkplagas: {
                    label: "Plagas",
                    value: formEnvir.chkplagas.value
                },
                chkexpsol: {
                    label: "Exposicion al Sol",
                    value: formEnvir.chkexpsol.value
                },
                chkhumedad: {
                    label: "Humedad",
                    value: formEnvir.chkhumedad.value
                },
                chkmalailuminacion: {
                    label: "Mala Iluminacion",
                    value: formEnvir.chkmalailuminacion.value
                },
                chknoaa: {
                    label: "Noaa",
                    value: formEnvir.chknoaa.value
                }
            }
        },
        chkprocomms: {
            label: "Problema de comunicacion",
            check: formEnvir.chkprocomms.value,
            value: {
                selcomunicaciones: {
                    label: "Comunicacion",
                    value: formEnvir.selcomunicaciones.value
                }
            }
        },
        chkprooperativo: {
            label: "Problema Operativo",
            check: formEnvir.chkprooperativo.value,
            value: {
                chksininsumos: {
                    label: "Sin Insumo",
                    value: formEnvir.chksininsumos.value
                },
                chksinbilletes: {
                    label: "sin billetes",
                    value: formEnvir.chksinbilletes.value
                },
                chkmalacalidadbilletes: {
                    label: "Mala calidad de Billetes",
                    value: formEnvir.chkmalacalidadbilletes.value
                },
                chkmalacalidadinsumos: {
                    label: "Mala calidad de insumos",
                    value: formEnvir.chkmalacalidadinsumos.value
                },
                chkerroroperador: {
                    label: "error de operador",
                    value: formEnvir.chkerroroperador.value
                },
                chkcargainccaseteras: {
                    label: "Carga casetera",
                    value: formEnvir.chkcargainccaseteras.value
                },
                chkcargaincpapel: {
                    label: "Cagar papel",
                    value: formEnvir.chkcargaincpapel.value
                },
                chkerrorbalanceo: {
                    label: "error de balanceo",
                    value: formEnvir.chkerrorbalanceo.value
                },
                chksupervisor: {
                    label: "supervisor",
                    value: formEnvir.chksupervisor.value
                }
            }
        },
        chkprovandalismo: {
            label: "problema de vandalismo",
            check: formEnvir.chkprovandalismo.value
        },
        chkprootros: {
            label: "otros problemas",
            check: formEnvir.chkprootros.value
        }
    };
    return nuevoForm;
}

module.exports = {
    map: Mapper,
    viewEnvironment:viewEnvironment
};