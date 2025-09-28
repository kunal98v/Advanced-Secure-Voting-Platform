const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60*1000, 
  max: 5, 
  keyGenerator: (req) => req.ip + ":" + req.path,
  handler: (req, res, next) => res.status(429).json({'message': 'You have exceeded the request limit. Try again later.'})
});

module.exports = limiter;