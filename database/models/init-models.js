var DataTypes = require("sequelize").DataTypes;
var _transaccion = require("./transaccion");

function initModels(sequelize) {
  var transaccion = _transaccion(sequelize, DataTypes);


  return {
    transaccion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
