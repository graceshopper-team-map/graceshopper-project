const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");

const GameOrder = db.define("GameOrder", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
    price: {
      type: Sequelize.NUMERIC(10, 2),
    },
  },
});

module.exports = GameOrder;
