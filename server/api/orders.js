const router = require('express').Router();
const {
  models: { Order },
} = require('../db');
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

// router.put('/:id', async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (order) res.json(order);
//     else res.sendStatus(404);
//   } catch (err) {
//     next(err);
//   }
// });
