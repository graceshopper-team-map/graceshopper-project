const router = require("express").Router();
const {
  models: { GameOrder, Order, User, Product },
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
    const game = await GameOrder.findAll({
      where: {
        orderId: req.params.id,
      },
      include: Product,
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
