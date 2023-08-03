// const hola = require("node-fetch")
// async function apiGou (requestID){
//     const url = "https://checkout.test.goupagos.com.co/api/session/"
//     const id = requestID;

//     fetch(url+id)
//     .then((respuesta)=>{
//         return respuesta.json()
//     }).then((resp)=>{
//         console.log(resp)
//     })
// }
// module.exports = {
//     apiGou
// }
const sh1 = require("sha1")
const crypto = require('crypto');

async function apiGou(requestID) {
    try {
        const url = `https://checkout.test.goupagos.com.co/api/session/${requestID}`




        const login = "cbafc4f6c18270a6296e509ce34b43ed"
        // const secretKey = "I4MD5XuXSkgVZ1Hq"
        // ejemplo 300

        // // Paso 1: Generar el número aleatorio (entre 0 y 1)
        // const nonce = Math.random();

        // // Paso 2: Convertir el número en una cadena (opcional)
        // const randomNumberAsString = nonce.toString();

        // // Paso 3 (opción 1 - para navegadores): Codificar en Base64 usando btoa()
        // const base64EncodedNumber = btoa(randomNumberAsString);

        // // Paso 3 (opción 2 - para Node.js): Codificar en Base64 usando Buffer.from()
        // const nonce2 = Buffer.from(randomNumberAsString).toString('base64');

        // console.log('Número aleatorio:', nonce);
        // console.log('Número aleatorio como cadena:', randomNumberAsString);
        // console.log('Base64 codificado (opción 1):', base64EncodedNumber);
        // console.log('Base64 codificado (opción 2):', nonce2);
        // function formatDateTimeToISO8601(date) {
        //     const year = date.getUTCFullYear();
        //     const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        //     const day = String(date.getUTCDate()).padStart(2, '0');
        //     const hours = String(date.getUTCHours()).padStart(2, '0');
        //     const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        //     const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        //     return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
        // }

        // const currentDate = new Date();
        // const seed = formatDateTimeToISO8601(currentDate);
        // console.log(seed);

        // function calculateRanKey(randomNumberAsString, seed, secretKey) {
        //     const concatenatedData = randomNumberAsString + seed + secretKey;
        //     const hashedData = crypto.createHash('sha1').update(concatenatedData).digest();
        //     const base64Encoded = Buffer.from(hashedData).toString('base64');
        //     return base64Encoded;
        // }

        // const tranKey = calculateRanKey(nonce, seed, secretKey);
        // console.log(tranKey); // Output: NjdhMGNkY2RlOTA4N2ZiMzUzNzBlYzM2ODM0MDM5ZjJmYWJiOGRiMg==


        // ejemplo 400

        const nonce = crypto.randomBytes(16);
        const nonce2 = nonce.toString('base64');

        function formatDateTimeToISO8601(date) {
            date.setUTCHours(date.getUTCHours() + 2); // Agregar dos horas a la fecha
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            const hours = String(date.getUTCHours()).padStart(2, '0'); // Asegurarse de que las horas tengan 2 dígitos
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
        }

        const currentDate = new Date();
        const seed = formatDateTimeToISO8601(currentDate);

        const secretKey = "tu_secret_key"; // Reemplaza esto con tu secret key

        const concatenatedString = nonce2 + seed + secretKey;
        const sha1Hash = crypto.createHmac('sha1', secretKey).update(concatenatedString).digest();
        const tranKey = Buffer.from(sha1Hash).toString('base64');

        console.log('Número aleatorio (Base64):', nonce2);
        console.log('Seed:', seed);
        console.log('TranKey:', tranKey);

        const obj = {
            locale: "es_CO",
            auth: {
                login,
                tranKey,
                nonce2,
                seed
            }
        }
        console.log(nonce)
        console.log(nonce2)
        console.log(seed)
        console.log(tranKey)
        console.log(url)
        console.log(JSON.stringify(obj))

        const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(resp)

    } catch (error) {
        console.error('Error al hacer la consulta', error);
    }

}


module.exports = {
    apiGou
}
