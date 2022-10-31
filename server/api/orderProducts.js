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
    console.log(e);
  }
});

// GET api/orderProducts/:id
router.get("/:id", async (req, res, next) => {
  try {
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

router.delete("/:id/:productId", async (req, res, next) => {
  const id = req.params.id;
  const productId = req.params.productId;

  try {
    const order = await Order.findOne({
      where: [{ userId: id }, { status: "unfullfilled" }],
    });

    const updatedItem = await GameOrder.destroy({
      where: { productId: productId, orderId: order.id },
    });
    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
});
