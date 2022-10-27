const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');
const Order = require('./Order');

const OrderProducts = db.define('OrderProducts', {
  // o: you don't need to add these manually if you setup your association correctly
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
});

module.exports = OrderProducts;
