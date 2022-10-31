const router = require("express").Router();
const {
  models: { Order, Product, GameOrder, User },
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
    const order = await Order.findByPk(req.params.id, {
      include: Product,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET /orders/user/id
router.get("/user/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    //make sure the orders we get back for the user is not completed
    const order = await user.getOrders({
      where: { status: "unfullfilled" },
      include: [
        { model: Product },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const cart = order[0].products;

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
