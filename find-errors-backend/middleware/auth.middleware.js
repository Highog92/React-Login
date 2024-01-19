const jwt = require("jsonwebtoken");
// Set up options for token from .env file
const jwtDataOptions = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};
// Import tokenExpired Method
const { TokenExpiredError } = jwt;

// Error handler
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token expired!" });
  } else return res.status(401).send({ message: "Unauthorized!" + err });
};

// Verify token function
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  // Splits token at "Bearer" to get only the string and decodes it if it is verified
  jwt.verify(token.split(" ")[1], jwtDataOptions.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
