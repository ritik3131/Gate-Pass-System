const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const generateToken = (newUser, req) => {
  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.mailId,
      name: newUser.name,
      isAdmin: req.session.isAdmin,
      requestsPerMonth: newUser.requestsPerMonth,
    },
    process.env.SCERET_KEY,
    { expiresIn: "5h" }
  );
  return token;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "rollNo",
    "phoneNo",
    "roomNo",
    "hostel",
    "branch"
  );
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError("No doc found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUpdateForm = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  // if (!req.user.hostel || !req.user.roomNo)
  //   return res.redirect("/user/update-form");

  const user = await User.findById(req.user._id).populate("requests");
  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }

  const token = generateToken(user, req);

  res.status(200).json({
    status: "success",
    data: {
      user,
      token,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
