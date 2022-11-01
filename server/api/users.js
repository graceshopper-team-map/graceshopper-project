const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "username",
        "firstName",
        "lastName",
        "email",
        "biography",
        "facebook",
        "website",
      ],
      include: Order,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Order
    });
    if (user) res.json(user);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});
