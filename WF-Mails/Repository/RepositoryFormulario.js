var DBSql = require("./DBSqlServer");

function getFormulario(idform, nameTable) {
    let hasParametro = {
        formid: {
            Value: idform,
            Type: "VarChar"
        }
    };
    let query = "select * from " + nameTable + " where formid = @formid";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hasParametro, query, (data, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function insertFormDevolucionParte(form) {
    let hashParametro = {};
    hashParametro.formid = {
        Value: form.formid.value,
        Type: "VarChar"
    };
    hashParametro.warehouse = {
        Value: form.warehouse.value,
        Type: "VarChar"
    };
    hashParametro.localidad = {
        Value: form.localidad.value,
        Type: "VarChar"
    };
    hashParametro.txtfecha = {
        Value: form.txtfecha.valueOriginal,
        Type: "VarChar"
    };
    hashParametro.gng = {
        Value: form.gng.value,
        Type: "Bit"
    };
    hashParametro.oca = {
        Value: form.oca.value,
        Type: "Bit"
    };
    hashParametro.guia = {
        Value: form.guia.value,
        Type: "VarChar"
    };
    hashParametro.empresa = {
        Value: form.empresa.value,
        Type: "VarChar"
    };
    hashParametro.ordenretiro = {
        Value: form.ordenretiro.value,
        Type: "VarChar"
    };
    hashParametro.foto1 = {
        Value: form.foto1.namePhoto,
        Type: "VarChar"
    };
    hashParametro.foto2 = {
        Value: form.foto2.namePhoto,
        Type: "VarChar"
    };
    hashParametro.foto3 = {
        Value: form.foto3.namePhoto,
        Type: "VarChar"
    };
    hashParametro.foto4 = {
        Value: form.foto4.namePhoto,
        Type: "VarChar"
    };
    hashParametro.guiadhl = {
        Value: form.guiadhl.value,
        Type: "VarChar"
    };
    let stringParte = "";
    for (let i = 0; i < form.partes.value.length; i++) {
        let auxParte = form.partes.value[i];
        for (let attr in auxParte) {
            stringParte += auxParte[attr] + ";"
        }
    }
    stringParte = stringParte.substr(0, (stringParte.length - 1));
    hashParametro.partes = {
        Value: stringParte,
        Type: "VarChar"
    };
    return new Promise((resolve, reject) => {
        DBSql.sqlProcedure('insertDevolucion', hashParametro, function(err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}

function getTypeData(data) {
    var tipo = null;
    switch (typeof data) {
        case "string":
            if (data.length > 250) {
                tipo = "Text";
            } else {
                tipo = "VarChar";
            }
            break;
        case "number":
            tipo = "Int";
            break;
        case "boolean":
            tipo = "Bit";
            break;
        case "object":
            tipo = "VarChar";
            break;
    }
    return tipo;

}

function insertFormulario(form) {
    let hashParametro = {};
    let queryInsert = `INSERT INTO ${form.tablaName.value} (`;
    let values = " values (";
    for (let attr in form) {
        if (attr === "cliente" || attr === "csrcode" || attr === "author" || attr === "Contactos" ||
            attr == "nameForm" || attr == "partes" || attr == "enviado" || attr == "insertSql" ||
            attr == "exists" || attr == "bodyMail" || attr == "tablaName") continue;
        queryInsert += `${attr},`;
        values += `@${attr},`;
        //indentificar cuando es foto
        if (attr == 'foto1' || attr == 'foto2' || attr == 'foto3' || attr == 'foto4') {
            hashParametro[attr] = {
                Value: form[attr].namePhoto,
                Type: "Text"
            }
        } else {
            hashParametro[attr] = {
                Value: (form[attr] && (form[attr].type == "date") ? form[attr].valueOriginal : form[attr].value),
                Type: getTypeData(form[attr].value)
            }
        }
    }
    queryInsert = queryInsert.substr(0, (queryInsert.length - 1));
    queryInsert += ") ";
    queryInsert += values;
    queryInsert = queryInsert.substr(0, (queryInsert.length - 1));
    queryInsert += ") ";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, queryInsert, function(data, err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}

function insertJsonForm(id, jsonForm) {
    let hashParametro = {};
    hashParametro.idForm = {
        Value: id,
        Type: "VarChar"
    };
    hashParametro.Json = {
        Value: jsonForm,
        Type: "Text"
    };

    return new Promise((resolve, reject) => {
        DBSql.sqlProcedure('sp_insert_Json', hashParametro, function(err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    })
}

function GetJsonForm() {
    let query = "select * from FORM_JSON";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery({}, query, (data, err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

module.exports = {
    getFormulario,
    insertFormDevolucionParte,
    insertFormulario,
    insertJsonForm,
    GetJsonForm
}