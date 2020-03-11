const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/authController");



router.post(
    "/",
  
    [
         check('email', 'Agrega un email válido').isEmail(),
         check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6})
  
    ],

    authControllers.authUser  
    
  );
  
  module.exports = router;
  
