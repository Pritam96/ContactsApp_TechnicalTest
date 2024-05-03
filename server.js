const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Route files
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

// Loading env variables
dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDB();

// Creating express app
const app = express();

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

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
