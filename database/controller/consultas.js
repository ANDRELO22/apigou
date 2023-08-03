const Sequelize = require('sequelize');
const {conexion} = require('../config/conexion')
const initModels = require('../models/init-models');

async function findTransacciones (requestID){
    try {
        // initModels(sequelize)
        const sequelize = conexion();
        const {transaccion} = initModels(sequelize,Sequelize)
        const tr = await transaccion.findOne({ where: { reference_sale: requestID } });
        return tr
    } catch (error) {
        console.error('Error al hacer la consulta', error);
    }
}

async function updateTransacciones (Val){
    try {
        const {status,date,requestId } = Val
        const requestIdString = String(requestId);
        console.log(requestIdString)
        const sequelize = conexion();
        const {transaccion} = initModels(sequelize,Sequelize)
        const tr = await transaccion.update(
            {response_message_pol : status , register_date: date},
            { where: { reference_sale: requestIdString } });
        return tr
    } catch (error) {
        console.error('Error al hacer la consulta', error);
    }
}



module.exports={
    findTransacciones,
    updateTransacciones
}
