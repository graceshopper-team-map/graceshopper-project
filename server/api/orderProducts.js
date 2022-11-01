const router = require("express").Router();
const {
  models: { GameOrder, User, Order, Product },
} = require("../db");

module.exports = router;

// GET all gameOrders ALL GAME ORDERS
router.get("/", async (req, res, next) => {
  try {
    const games = await GameOrder.findAll();
    res.json(games);
  } catch (e) {
    next(e);
  }
});

// GET api/orderProducts/:id all Game Orders for single user
router.get("/:userId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.userId, status: "unfullfilled" },
    });

    const game = await GameOrder.findAll({
      where: {
        orderId: order.id,
      },
      include: Product,
    });

    if (game) res.json(game);
    else status(404).json("No game order found");
  } catch (err) {
    next(err);
  }
});

//GET Route for single cart item
router.get("/:userId/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.userId, status: "unfullfilled" },
    });

    if (order) {
      const cartItem = await GameOrder.findOrCreate({
        where: { orderId: order.id, orderId: req.params.orderId },
        include: Product,
      });
      res.json(cartItem);
    }
  } catch (e) {
    next(e);
  }
});

// POST api/orderproducts/:orderId
router.post("/:orderId", async (req, res, next) => {
  try {
    const orderProducts = await GameOrder.create({
      orderId: req.params.orderId,
      productId: req.params.productId,
    });
    if (orderProducts) res.json(orderProducts);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

// DELETE
