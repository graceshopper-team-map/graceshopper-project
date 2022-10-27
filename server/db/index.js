//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const OrderProducts = require("./models/OrderProducts");

//associations could go here!
//OTM
User.hasMany(Order);
Order.belongsTo(User);

//M2M
Order.belongsToMany(Product, { through: OrderProducts });
Product.belongsToMany(Order, { through: OrderProducts });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderProducts,
  },
};
