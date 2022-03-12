const AppError = require(`${__dirname}/../utils/appError`);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate Fields value: "${value}." Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// const sendErrorDev = (err, req, res) => {
//   console.error("ERROR->->", err);
//   return res.status(err.statusCode).json({
//     title: "Something went wrong",
//     message: err.message,
//   });
// };

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "Something went wrong",
      message: err.message,
    });
  }

  // console.error("ERROR", err);

  return res.status(err.statusCode).json({
    title: "Something went wrong",
    message: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  console.log("Hi");
  err.statusCode = err.statusCode || 500; //internal server error
  err.status = err.status || "error"; // status -> fail

  if (err.name === "CastError") {
    err = handleCastErrorDB(err);
  }
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err._message === "Validation failed") err = handleValidationErrorDB(err);
  sendErrorProd(err, req, res);
  // }
};
