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

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.update(req.body)
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy()
    res.send(product)
  } catch (err) {
    next(err);
  }
});
