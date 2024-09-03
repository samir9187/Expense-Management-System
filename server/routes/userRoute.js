const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");

// Router object
const router = express.Router();

// Routes
// POST || LOGIN USER
router.post("/login", loginController);

// POST || REGISTER USER
router.post("/register", registerController);

module.exports = router;
