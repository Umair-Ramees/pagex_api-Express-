require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var db = require("./config/dbConnection");
var bodyParser = require("body-parser");
// const rateLimiter = require('express-rate-limit-middleware').rateLimit
const helmet = require("helmet");
let mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openApiDocumentation/BasicInformation");
const generateData = require("./api/generateData/index");

// Routes
const indexRouter = require("./api/routes/index");
const userRouter = require("./api/routes/user");
const contentRouter = require("./api/routes/content");
const passionRouter = require("./api/routes/passion");
const columnRouter = require("./api/routes/column");
const artFromRouter = require("./api/routes/artforms");
const pageRouter = require("./api/routes/page");
const requestRouter = require("./api/routes/request");
const categoryRouter = require("./api/routes/category");

// Main app
var app = express();

// Logs
app.use(logger("dev"));

// important if behind a proxy to ensure client IP is passed to req.ip
//app.enable('trust proxy');

//Map global promise
mongoose.Promise = global.Promise;

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Limit request per ip address
//app.use(rateLimiter({
//  limit: 1000,
//  reset: '1 hour'
//}))

// Fix CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Open connection to the database
db.once("open", function () {
  console.log("Connected to mongodb!");
});

// Catch errors on database connection failure
db.on("error", function (err) {
  console.log("Error while connecting to database: ", err);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Call routes API
app.use("/index", indexRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/passion", passionRouter);
app.use("/api/v1/column", columnRouter);
app.use("/api/v1/artforms", artFromRouter);
app.use("/api/v1/pages", pageRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/categories", categoryRouter);

// Generate data
generateData.generateData();

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Use hamlet
app.use(helmet());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
