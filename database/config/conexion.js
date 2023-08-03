const Sequelize = require('sequelize');
function conexion(){
    const sequelize = new Sequelize('gou', 'gou', 'Umbr3ll42014.', {
        host: '190.60.110.38',
        dialect: 'postgres'
    });
    return sequelize
    
}
module.exports={
    conexion
}
