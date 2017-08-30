/**
 * Created by mc185249 on 18/08/2016.
 **/

var mail = require("./Modulos/main");
//mail.InitProcess();
function InicialScheduler(){
    mail.InitProcessSearchBase()
        .then(()=>{
            setTimeout(()=>{
                InicialScheduler();
            },60000)
        })    
}



module.exports = InicialScheduler;