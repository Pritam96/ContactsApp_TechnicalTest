const express = require("express");
const dotenv = require("dotenv");

// Loading env variables
dotenv.config({ path: "./config/config.env" });

// Creating express app
const app = express();

// Fetching env variables from config/config.env
const PORT = process.env.PORT;

// Running the server
app.listen(PORT, console.log(`Server is up and running on port: ${PORT}`));
