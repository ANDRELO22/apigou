const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transaccion', {
    idtransaccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reference_sale: {
      type: DataTypes.STRING,
      allowNull: true
    },
    extra1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    extra2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    response_message_pol: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_buyer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payment_method_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transaction_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    parametro_valor_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    register_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referencia_pago: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transaccion',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "transaccion_pkey",
        unique: true,
        fields: [
          { name: "idtransaccion" },
        ]
      },
    ]
  });
};
