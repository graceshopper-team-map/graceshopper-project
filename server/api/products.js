const router = require("express").Router();
const {
  models: { Product, Order, GameOrder },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: Order });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.json(product);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
