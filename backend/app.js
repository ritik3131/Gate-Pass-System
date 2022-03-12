const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const AppError = require("./utils/appError");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const requestRouter = require("./routes/requestRoutes");
const globalErrorHandler = require("./Controllers/errorController");
const UserModel = require("./models/UserModel");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

require("./config/passport")(passport);

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Session;
app.use(cookieParser("secretsssss"));
app.use(
  session({
    secret: "secretsssss",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure:false,
    },
  })
);

// Passwort Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.user) return next();
  if (req.user.mailId === process.env.ADMIN_ID) {
    req.session.isAdmin = true;
    req.session.save();
  } else req.session.isAdmin = false;
  next();
});

app.use(async (req, res, next) => {
  const date = new Date().getDate();
  const hrs = new Date().getHours();
  if (date === 1 && hrs === 1) {
    const allUsers = await UserModel.find({}).exec();
    allUsers.map((user) => {
      user.requestsPerMonth = 0;
      user.save();
    });
  }
  next();
});

const PORT = process.env.PORT || 9000;

// app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/", authRouter);
app.use("/api/v1/error", (req, res, next) => res.render);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/request", requestRouter);

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
}); //if cant find url

app.listen(PORT, console.log(`Server running at ${PORT}`));

process.on("unhandledRejection", (err) => {
  // unhandled promise rejection
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
