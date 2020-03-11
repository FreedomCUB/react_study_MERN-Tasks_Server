const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // Read token from header

  const token = req.header("x-auth-token");

  //console.log(token);

  // Check token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, Permiso no valido" });
  }

  // Validate token
  try {
    const cifrated = jwt.verify(token, process.env.SECRET);
    req.userdb = cifrated.userdb;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
