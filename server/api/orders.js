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
      include: Product,
    });
    const cart = order[0].products;
    if (cart) res.json(cart);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.delete("/user/:userId/:orderId/:productId", async (req, res, next) => {
  try {
    if (req.user.id === +req.params.userId) {
      const cartItem = await GameOrder.findOne({
        where: {
          orderId: req.params.orderId,
          productId: req.params.productId,
        },
      });

      // const { dataValues: product } = await Product.findByPk(
      //   cartItem.productId
      // );

      // const money = cartItem.quanity * product.price;

      // res.json(cartItem);
      await cartItem.destroy();
      res.send("deleted");
    }
  } catch (e) {
    next(e);
  }
});
