const sql = require("mssql");
const config = {
    user: 'ta_forms',
    password: 'teamanalysis',
    server: 'SARBUE8001',
    database: 'Forms',
}


module.exports = {
    getCliente: (pais) => {
        console.log(`select Nombres from Clientes where Pais = ${pais}`)
        return new Promise((resolve, reject) => {
            sql.connect(config).then(pool => {
                return pool.request()
                    .query(`select Nombres from Clientes where Pais = ${pais}`)
            })
                .then((result) => {
                    sql.close();
                    resolve(result.recordset);
                })
                .catch(err => {
                    sql.close();
                    reject(err)
                })

            sql.on('error', err => {
                sql.close();
                reject(err)
            })
        })
    }
}