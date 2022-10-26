const router = require('express').Router();
const {
  models: { OrderProducts },
} = require('../db');

module.exports = router;

// GET api/orderproducts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const orderproducts = await OrderProducts.findAll({
        where: {
            orderId: req.params.id
        }
    });
    if (orderproducts) res.json(orderproducts);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});
