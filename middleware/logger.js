module.exports = function logger(req, rest, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
