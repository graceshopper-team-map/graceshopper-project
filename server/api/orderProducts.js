const router = require("express").Router();
const {
  models: { GameOrder, User, Order, Product },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const games = await GameOrder.findAll();
    res.json(games);
  } catch (e) {
    next(e);
  }
});

// GET api/orderProducts/:id
router.get("/:id", async (req, res, next) => {
  try {
    // o: if they are logged in, you can retrieve user id from req.user.id
    const order = await Order.findOne({
      where: [{ userId: req.params.id }, { status: "unfullfilled" }],
    });

    const game = await GameOrder.findAll({
      where: {
        orderId: order.id,
      },
    });

    if (game) res.json(game);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
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
