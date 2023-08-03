const apiGou = require("./apiGou")
async function findValidacion(sh2, sh,requestID) {
    try {
        if (sh2 = sh) {
            const response = await apiGou.apiGou(requestID)
            console.log("Wiiiiiiiiiii")
            // await apiGou.
            return response 
        } else {
            return console.log(sh2 + " No es igual a " + sh)
        }
    }
    catch (error) {
        console.error('Error al hacer la Validacion ', error);
    }
}
module.exports = {
    findValidacion
}
