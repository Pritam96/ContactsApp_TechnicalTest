const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Route files
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

// Loading env variables
dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDB();

// Creating express app
const app = express();

// Body parser middleware
app.use(express.json());

// Cookie parser middleware
app.use(cookieParser());

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// ErrorHandler Middleware (It must be declare after mounting all routes)
app.use(errorHandler);

// Fetching env variables from config/config.env
const PORT = process.env.PORT || 5000;

// Running the server
const server = app.listen(
  PORT,
  console.log(`Server is up and running on port: ${PORT}`)
);

// Handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
