/**
 * Created by mc185249 on 29/08/2016.
 */
/**
 * Created by mc185249 on 29/08/2016.
 */
var sql = require('mssql');

var config = {
    user: 'ta_forms',
    password: 'teamanalysis',
    server: 'SARBUE8001',
    database: 'Forms'
};

function DBSqlServer(){

    this.SqlQuery = (hashParametro,query,callback) => {
        var conn = new sql.Connection(config);
        var req = new sql.Request(conn);
        conn.connect(function(err){
            if(err){
                callback(null,err);
                return;
            }
            buildParametro(req,hashParametro);
            req.query(query, function (err, data) {
                if(err){
                    callback(null,err);
                }else{
                    callback(data, null);
                }
                conn.close();
            });

        });
    };

    function buildParametro(cmd, hashParametro) {
        for(var attr in hashParametro){
            var object = hashParametro[attr];
            cmd.input(attr,sql[object.Type],object.Value);
        }
    }
    
    this.sqlProcedure = function (nameProcedure, hashParametro, callback) {
        var conn = new sql.Connection(config);
        var req = new sql.Request(conn);
        conn.connect(function (err) {
            if (err) {
                callback(err);
                return;
            }
            buildParametro(req, hashParametro);
            req.execute(nameProcedure, function (err, recordsets, returnValue) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
                conn.close();
            });
        });
    }

}

module.exports = new DBSqlServer();