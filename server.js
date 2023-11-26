const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/db");
const categoryRoute = require("./routes/category-route");
const subcategoryRoute = require("./routes/subcategory-route");
const brandRoute = require("./routes/brand-route");
const ApiError = require("./utils/ApiError");

// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use(`/api/${process.env.VERSION}/categories`, categoryRoute);
app.use(`/api/${process.env.VERSION}/subcategories`, subcategoryRoute);
app.use(`/api/${process.env.VERSION}/brands`, brandRoute);

app.use("*", (req, res, next) => {
  // Create error and send it to global handling error middleware
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
