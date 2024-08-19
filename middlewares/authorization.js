const { verifyToken } = require("../helpers/accessToken");

function authHandler(req, res, next) {
  console.log(req.headers.authorization);
  
    if (!req.headers.authorization) {
      throw ({ name: "NO_CREDENTIALS" });
    }
    try {
      const decoded = verifyToken(req.headers.authorization);
      req.decodedToken = decoded;
      next();
    } catch (error) {
      next(error);
    }
};

module.exports = authHandler;