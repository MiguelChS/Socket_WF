let routerCliente = require("./routerCliente");
module.exports = (Router) => {
    routerCliente(Router);
    return Router;
}