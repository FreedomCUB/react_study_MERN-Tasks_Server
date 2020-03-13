const UserDB = require("../models/UserDB");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//log user
//api/auth
exports.loginUser = async (req, res) => {
  // search errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructuring
  const { email, password } = req.body;

  try {
    // check user in db
    let userdb = await UserDB.findOne({ email });
    if (!userdb) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // check password
    let correctpass = await bcryptjs.compare(password, userdb.password);
    if (!correctpass) {
      return res.status(400).json({ msg: "Contraseña Incorrecta" });
    }

    // Create JWT
    const payload = {
      userdb: {
        id: userdb.id
      }
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.authUser = async (req, res) => {
  try {
    const user = await UserDB.findById(req.userdb.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
