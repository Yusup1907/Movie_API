const User = require("../models/UserModels");
const emailExist = require("../utils/emailExist");
const sendToken = require("../utils/jsonWebToken.js");

// Register User

exports.createUser = async (req, res, next) => {
  if (!req.body.fullName) {
    throw { code: 428, message: "Fullname is required" };
  }
  if (!req.body.email) {
    throw { code: 428, message: "email is required" };
  }
  if (!req.body.password) {
    throw { code: 428, message: "password is required" };
  }

  // Pengecekan email apakah sudah ada
  const isEmailExist = await emailExist(req.body.email);
  if (isEmailExist) {
    throw { code: 409, message: "email exist" };
  }

  const user = await User.create(req.body);
  if (!user) {
    throw { code: 500, message: "user register failed" };
  }
  sendToken(user, 200, res);
};

// Login User

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("User is not found with this email & password", 401)
    );
  }

  const hashPassword = await user.comparePassword(password);
  if (!hashPassword) {
    return next(
      new ErrorHandler("User is not found with this email & password", 401)
    );
  }

  sendToken(user, 200, res);
};

// Logout User

exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
};
