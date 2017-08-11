/**
 * Created by mc185249 on 22/08/2016.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var nodemailer = require('nodemailer');
//para poder mandar imagenes en base64
var inlineBase64 = require('nodemailer-plugin-inline-base64');
function sendEmail(){
    this.send = function(mailOptions,callBack){
        var transporter = nodemailer.createTransport({
            host: 'mailhost.daytonoh.ncr.com',
            port: 25,
            secure: false
        });
        transporter.use('compile', inlineBase64);
        transporter.sendMail(mailOptions,(err,info) => {
            if(err){
                callBack(err);
            } else {
                callBack(err);
            }
        });
    }
}

module.exports = new sendEmail();