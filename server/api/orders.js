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

//POST orders/user/:userId
router.post("/user/:userId/:orderId", async (req, res, next) => {
  try {
    const cartItem = await GameOrder.create({
      orderId: req.params.orderId,
      productId: req.params.productId,
      quanity: req.params.quanity,
    });
    res.json(cartItem);
  } catch (e) {
    next(e);
  }
});

//PUT orders
// router.put("/user/:userId/add", async (req, res, next) => {
//   try {
//     const cartItem = await GameOrder.findOne({where: {orderId: req.params.orderId}})
//   } catch (e) {
//     console.log(e);
//   }
// });

router.delete("/user/:userId", async (req, res, next) => {
  try {
    if (req.user.id === +req.params.userId) {
      const cartItem = await GameOrder.findOne({
        where: {},
      });
    }
  } catch (e) {
    next(e);
  }
});

// router.delete("/user/:productId", async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const cartItem = await GameOrder.findByPk(productId, { include: Order });

//     if (cartItem.order.userId === req.user.id) await cartItem.destroy();
//     else sendStatus(404);
//   } catch (e) {
//     next(e);
//   }
// });
