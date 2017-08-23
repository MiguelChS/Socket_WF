let serviceCliente = require("../service/cliente")

module.exports = (Router) => {
    Router.get("/cliente/:pais", async(req, res) => {
        try {
            let result = await serviceCliente.getCliente(req.params.pais);
            res.status(200).json(result.map(x => x.Nombres));
        } catch (e) {
            res.status(500).send()
        }
    })
}