const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post(
  "/",  

  authControllers.loginUser
);

router.get("/", auth, authControllers.authUser);

module.exports = router;
