const router = require('express').Router();
const {
  models: { Order },
} = require('../db');
const OrderProducts = require('../db/models/OrderProducts');
const Product = require('../db/models/Product');
module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.id,
      },
    });
    if (order) res.json(order);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (order) res.json(order);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
