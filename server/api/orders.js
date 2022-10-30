const router = require("express").Router();
const {
  models: { Order, Product, GameOrder },
} = require("../db");
module.exports = router;

// GET /orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /orders/id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET /orders/user/id
router.get("/user/:userId", async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [{ model: Product }],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});
