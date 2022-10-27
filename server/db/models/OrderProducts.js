const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");

const OrderProducts = db.define("OrderProducts", {
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: "id",
    },
  },
});

module.exports = OrderProducts;
