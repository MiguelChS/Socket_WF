var DBSql = require("./DBSqlServer");

function GetContacto(pCliente, pCsrcode, pPais) {
    let hashParametro = {
        cliente: {
            Value: pCliente,
            Type: "VarChar"
        },
        csrcode: {
            Value: pCsrcode,
            Type: "VarChar"
        },
        pais: {
            Value: pPais,
            Type: "VarChar"
        }
    }
    let query = "select DISTINCT Direcciones as mail from Contactos where (Numero = @csrcode or Numero = @cliente) AND Pais = @pais";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function GetContactoMemoriaFiscal(pCliente) {
    let hashParametro = {
        cliente: {
            Value: pCliente,
            Type: "VarChar"
        }
    };
    let query = "SELECT mail FROM MEMORIAFISCALCONTACTO WHERE cliente = @cliente";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function GetContactoDevolucion(pGNG, pCsrcode) {
    let hashParametro = {
        territorio: {
            Value: pCsrcode,
            Type: "VarChar"
        }
    };
    let query = "";
    if (pGNG) {
        query = "SELECT mail FROM DEVOLUCIONPARTECONTACTO where gng = 1 and (territorio = @territorio OR territorio = '1')";
    } else {

        query = "SELECT mail FROM DEVOLUCIONPARTECONTACTO where dhl_oca = 1 and (territorio = @territorio OR territorio = '1')";
    }
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function GetContactoCambioPidPad() {
    let query = "SELECT DISTINCT mail FROM PINPAD";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(null, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function GetContactoLogistic(pPais,pTerritorio) {
    let hashParametro = {
        pais: {
            Value: pPais,
            Type: "VarChar"
        },
        territorio: {
            Value: pTerritorio,
            Type: "VarChar"
        }
    };
    let query = "select DISTINCT mail from LOGISTICA where pais = @pais or pais = @territorio";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

function getSubjectDevolucion(legajo){
    let hashParametro = {
        legajo: {
            Value: legajo,
            Type: "VarChar"
        },
    };
    let query = "SELECT * FROM LOCALIDAD_DEVOLUCION_PARTE WHERE legajo = @legajo";
    return new Promise((resolve, reject) => {
        DBSql.SqlQuery(hashParametro, query, function (data, err) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

module.exports = {
    GetContacto,
    GetContactoMemoriaFiscal,
    GetContactoDevolucion,
    GetContactoCambioPidPad,
    GetContactoLogistic,
    getSubjectDevolucion
}