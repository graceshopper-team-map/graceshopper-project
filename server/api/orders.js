const router = require("express").Router();
const {
  models: { Order, Product, OrderProducts, User },
} = require("../db");
module.exports = router;

// *GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({ include: [User, Product] });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST /orders
router.post("/", async (req, res, next) => {
  try {
    const orders = await Order.create({});
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: Product
      }
    });
    if (order) res.json(order);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (order) res.json(order);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
