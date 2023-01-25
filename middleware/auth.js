const jwt = require("jsonwebtoken");
const User = require("../models/UserModels.js");

exports.isAuthUser = async (req, res, next) => {
  const { token } = req.cookies['token']

  if (!token) {
    
    throw { code: 401, message: "Please login four access" };
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
};

// Make Roles Admmin our Agen

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw { message: `${req.user.role} your can't access` };
    }

    next();
  };
};
