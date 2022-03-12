const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const nodemailer = require("nodemailer");

const User = require("./../models/UserModel");
const Request = require("./../models/requestModel");

exports.createRequest = catchAsync(async (req, res, next) => {
  if (req.user.requestsPerMonth >= 2)
    return next(
      new AppError("You have already made 2 requests in this month", 404)
    );

  const requestObj = Object.assign(req.body, { bookedby: req.user._id });
  const request = await Request.create(requestObj);

  const user = await User.findByIdAndUpdate(req.user._id, {
    $push: { requests: request._id },
  }).populate("requests");
  if (
    user.rollNo &&
    user.name &&
    user.phoneNo &&
    user.hostel &&
    user.rollNo &&
    user.roomNo &&
    user.branch
  )
    return next(new AppError("You are not allowed to make a request", 404));

  //Send mail to the user that it request is in process

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_ID,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_ID,
    to: user.mailId,
    subject: "GATE-PASS Request",
    text: `${user.name} your Gate Pass request is in process`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else console.log("Mail send successfully");
  });

  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }

  res.status(200).json(request);
});

exports.getRequestForm = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.status(200).json(user);
});

exports.deleteRequest = catchAsync(async (req, res) => {
  const request = await Request.findByIdAndDelete(req.params.id);
  if (!request) {
    return next(new AppError("No doc found with that id", 404));
  }
  res.status.send("Request deleted");
});
