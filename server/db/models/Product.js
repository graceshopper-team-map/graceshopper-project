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
    defaultValue:
      "https://images.nintendolife.com/games/nes/super_mario_bros/cover_large.jpg",
  },
  price: {
    type: Sequelize.NUMERIC(10, 2),
    allowNull: false,
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
