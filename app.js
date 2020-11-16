// external imports
const express = require("express");
const bodyParser = require("body-parser");

// internal imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// database
const db = require("./utils/database");

// create express app
const app = express();

// set template engine
app.set("view engine", "ejs");
app.set("views", "views");

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

// adding middleware for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// error controller
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// start server at port 3000
app.listen(3000);
