const express = require("express");
const dotenv = require("dotenv");

// Route files
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

// Loading env variables
dotenv.config({ path: "./config/config.env" });

// Creating express app
const app = express();

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// Fetching env variables from config/config.env
const PORT = process.env.PORT || 5000;

// Running the server
app.listen(PORT, console.log(`Server is up and running on port: ${PORT}`));
