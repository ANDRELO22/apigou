const express = require("express");
const sh1 = require("sha1")
const { conexion } = require('./database/config/conexion');
const initModels = require("./database/models/init-models");
const dataDervice = require("./database/controller/consultas")
const Validacion = require("./service/validaciones")

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    const headers = req.headers;
    res.json({ "status": "ok", "headers": headers });
});

app.post("/verify/payments", async (req, res) => {
    const headerValue = req.headers["User-Agent"]; 
    if (headerValue !== "uno") {

        return res.status(403).json({ "error": "Header incorrecto" });
    }
    try {
        // lo que nos llega por post 
        const { requestID, reference, signature } = req.body;
        // aca hacemos las consultas 
        const tr = await dataDervice.findTransacciones(requestID)
        const { reference_sale, transaction_date, referencia_pago } = tr

        // Validamos
        const sh = sh1(requestID + reference + signature);
        const sh2 = sh1(reference_sale + transaction_date + referencia_pago)
        const Val = await Validacion.findValidacion(sh, sh2, requestID)
        console.log(Val)
        // actualizamos 
        const upda = await dataDervice.updateTransacciones(Val, tr)
        console.log(upda)



        res.status(200).json({ "data": tr });
    } catch (error) {
        res.status(400).json({ "error": error });
    }
});
app.listen(PORT, () => {
    try {
        const sequelize = conexion();
        sequelize.authenticate()
            .then(() => {
                console.log('Conexion exitosa');
                initModels(sequelize);
            })
            .catch(error => {
                console.log('Conexion error' + error)
            })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log("Server is running on port ", PORT)
})