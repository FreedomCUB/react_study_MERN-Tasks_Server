const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();
const { check } = require("express-validator");

router.post(
  "/",

  [
       check('name', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'Agrega un email válido').isEmail(),
       check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6})

  ],

  userControllers.createUser
);

module.exports = router;
