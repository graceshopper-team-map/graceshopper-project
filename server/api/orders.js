const router = require("express").Router();
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

router.post("/user/:userId", async (req, res, next) => {});

//DELETE
router.delete("/:productId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.userId, status: "unfullfilled" },
    });

    if (order) {
      await GameOrder.destroy({
        where: {
          orderId: order.id,
          productId: req.params.productId,
        },
      });
    }
  } catch (e) {
    next(e);
  }
});
