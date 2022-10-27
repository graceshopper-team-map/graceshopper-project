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
    // o: genuine question, when would you NOT get data from the db on this query 🤔
    //  let's chat about this in our Sprint Meeting
    if (orderProducts) res.json(orderProducts);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
