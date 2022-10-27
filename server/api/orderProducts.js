const router = require("express").Router();
const {
  models: { OrderProducts },
} = require("../db");

module.exports = router;

// GET api/orderproducts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const orderProducts = await OrderProducts.findAll({
      where: {
        orderId: req.params.id,
      },
    });
    if (orderProducts) res.json(orderProducts);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

// POST api/orderproducts/:orderId
router.post("/:orderId", async (req, res, next) => {
  try {
    const orderProducts = await OrderProducts.create({
      orderId: req.params.orderId,
      productId
    });
    if (orderProducts) res.json(orderProducts);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
