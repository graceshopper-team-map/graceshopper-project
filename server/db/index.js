//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const GameOrder = require("./models/GameOrder");

//associations could go here!
//OTM
User.hasMany(Order);
Order.belongsTo(User);

//M2M
Order.belongsToMany(Product, { through: GameOrder });
Product.belongsToMany(Order, { through: GameOrder });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    GameOrder,
  },
};
