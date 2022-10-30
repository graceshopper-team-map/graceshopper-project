const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");

const GameOrder = db.define("GameOrder", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
    },
    subtotal: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0,
      },
    },
  },
});

module.exports = GameOrder;
