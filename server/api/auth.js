// Custom Middleware to check for the type of user within our routes
const {
  models: { User },
} = require("../db");

// Check if requested route is authorized
const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) next();
    else throw new Error("Unauthorized Route");
  } catch (e) {
    next(e);
  }
};

// Check if the user is an admin
const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // contains the Headers object associated with the authorization request
    const user = await User.findByToken(token);
    req.user = user; // contains user id
    if (!req.user.isAdmin) throw new Error("You do not have admin privileges");
  } catch (e) {
    next(e);
    res.send("trash 2");
  }
};

// Check if user
const findUserById = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // contains the Headers object associated with the authorization request
    const user = await User.findByToken(token);
    req.user = user; // contains user id
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkAdmin,
  findUserById,
  auth,
};
