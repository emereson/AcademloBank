const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfers = db.define('transfers', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Transfers;
