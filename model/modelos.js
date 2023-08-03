const { Sequelize, DataTypes } = require('sequelize');
// conexion a la base de datos 
const sequelize = new Sequelize('gou', 'gou', 'Umbr3ll42014.', {
    host: '190.60.110.38',
    dialect: 'postgres'
});
// // modelo de la base de datos 
// const Transaccion = sequelize.define('transaccion', {
//     reference_sale: {
//         type: DataTypes.STRING,
//     },
//     referencia_pago: {
//         type: DataTypes.STRING,
//     },
// });

const Transaccion = sequelize.define('transaccion', {
    idtransaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reference_sale: {
        type: DataTypes.STRING,
    },
    extra1: {
        type: DataTypes.STRING,
    },
    extra2: {
        type: DataTypes.STRING,
    },
    response_message_pol: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    email_buyer: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.INTEGER,
    },
    payment_method_name: {
        type: DataTypes.STRING,
    },
    transaction_date: {
        type: DataTypes.DATEONLY,
    },
    parametro_valor_id: {
        type: DataTypes.INTEGER,
    },
    register_date: {
        type: DataTypes.DATE,
    },
    referencia_pago: {
        type: DataTypes.STRING,
    },
});

module.exports = Transaccion;