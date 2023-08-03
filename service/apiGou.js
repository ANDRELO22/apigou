const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();


function formatDateTimeToISO8601(date) {
    date.setUTCMinutes(date.getUTCMinutes()); // Restar 5 minutos a la fecha
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+00:00`;
}

async function apiGou(requestID) {
    try {
        // const secretKey = 'I4MD5XuXSkgVZ1Hq';
        // const login = 'cbafc4f6c18270a6296e509ce34b43ed';
        const login = process.env.LOGIN
        const secretKey = process.env.SECRET_KEY
        // Generar nonce
        const nonceBuffer = crypto.randomBytes(16);
        const nonce = nonceBuffer.toString('base64');

        // Generar seed
        const currentDate = new Date();
        const seed = formatDateTimeToISO8601(currentDate);

        // Generar tranKey
        const datas = Buffer.concat([nonceBuffer, Buffer.from(seed, 'utf-8'), Buffer.from(secretKey, 'utf-8')]);
        const tranKey = crypto
            .createHash('sha1')
            .update(datas)
            .digest('base64');

        // Preparar el payload de la solicitud
        const payload = {
            locale: 'es_CO',
            auth: {
                login: login,
                tranKey: tranKey,
                nonce: nonce,
                seed: seed,
            },
        };
        console.log(JSON.stringify(payload))

        // URL de la API
        const url = `https://checkout.test.goupagos.com.co/api/session/${requestID}`;
        const response = await axios.post(url, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;
        const status = data.status.status;
        const date = data.status.date;
        const dateTime = new Date(date);
        const requestId = data.requestId;
        const fechaNormal = dateTime.toISOString();
        console.log('Estado:', status);
        console.log('Fecha:', fechaNormal);
        console.log('data:', data);
        console.log('requestId:', requestId);

        return { status, date, requestId };
    } catch (error) {
        console.error('Error:', error.message);
    }

}

module.exports = {
    apiGou
};