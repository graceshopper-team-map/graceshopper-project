const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("fullfilled", "unfullfilled"),
    defaultValue: "unfullfilled",
  },
});

module.exports = Order;
