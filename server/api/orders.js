const router = require("express").Router();
const { Rotate90DegreesCcw } = require("@mui/icons-material");
const {
  models: { Order, Product, GameOrder, User },
} = require("../db");
const { checkAdmin, findToken, auth } = require("./auth");

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

// GET /orders/user/id *Get the user's cart info
router.get("/cart", auth, findToken, async (req, res, next) => {
  try {
    console.log(req.user.id);
    //make sure the orders we get back for the user is not completed
    const order = await Order.findOne({
      where: { userId: req.user.id, status: "unfullfilled" },
      include: Product,
    });

    const cart = order.products;

    if (cart) res.json(cart);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get("/user2/:userId", async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: {
        model: Product,
      },
    });
    if (order) res.json(order);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

//POST *add item to cart
router.post("/cart", auth, findToken, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const order = await Order.findOne({
      where: { userId: req.user.id, status: "unfullfilled" },
    });

    const gameOrder = await GameOrder.findOrCreate({
      where: {
        orderId: order.id,
        productId,
      },
      defaults: { quantity: 1, subtotal: 0 },
      include: Product,
    });

    res.json(gameOrder);
  } catch (err) {
    next(err);
  }
});

router.put("/:productId/add", auth, findToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, status: "unfullfilled" },
    });

    const gameOrder = await GameOrder.findOne({
      where: { orderId: order.id, productId: req.params.productId },
      include: Product,
    });

    await gameOrder.increment("quantity");
    if (gameOrder.product.quantity > 0) {
      await gameOrder.product.decrement("quantity");
    }
    res.send(gameOrder);
  } catch (e) {
    next(e);
  }
});

//PUT Decrement Game
router.put("/:productId/sub", auth, findToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, status: "unfullfilled" },
    });

    const gameOrder = await GameOrder.findOne({
      where: { orderId: order.id, productId: req.params.productId },
      include: Product,
    });

    await gameOrder.decrement("quantity");
    res.send(gameOrder);
  } catch (e) {
    next(e);
  }
});

// PUT
// fulfilling the checkout
// we get order id from cart
router.put("/:orderId", auth, findToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId },
      include: Product,
    });

    await order.update({ status: "fullfilled" });
    await order.products.map((product) => {
      product.decrement("quantity", { by: product.GameOrder.quantity });
    });
    res.send(order);
  } catch (e) {
    next(e);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const order = await Order.create({});
    await order.setUser(req.params.userId);
    res.send(order);
  } catch (e) {
    next(e);
  }
});
