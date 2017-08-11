let email = require('./SendEmail');

function EnvioError(error) {
    let bodyMail = {
        from: 'mc185249@ncr.com',
        html: `<p>${error}</p>`,
        subject: 'FORMULARIO ERROR',
        to: 'mc185249@ncr.com'
    }
     email.send(bodyMail, (err) => {
            if (err) {
                console.log('error en el envio de errores')
            }
        })
}

module.exports = EnvioError;