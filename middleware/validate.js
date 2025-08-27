module.exports = function validate(req, res, next) {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ message: "Username and Password are Required !" });
  }
  next();
}