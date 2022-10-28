const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");
const Order = require("./Order");

const OrderProducts = db.define("OrderProducts", {});

module.exports = OrderProducts;
