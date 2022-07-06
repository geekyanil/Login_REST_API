const express = require("express");
const app = express();

// imporing dotenv and connecting to the config file
require("dotenv").config({ path: "./config/config.env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
const user = require("./routes/user-routes");

app.use("/api/v1", user);

module.exports = app;
