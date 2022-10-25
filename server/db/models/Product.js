const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 0 },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 0 },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { notEmpty: true },
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
});

module.exports = Product;
