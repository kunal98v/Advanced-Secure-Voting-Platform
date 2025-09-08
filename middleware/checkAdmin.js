const jwt  = require("jsonwebtoken");
require("dotenv").config();

module.exports = function checkAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
  if (decoded.role != 'admin') {
    return res.status(400).json({ message: "Role should be admin!" });
  }
  next();
};
