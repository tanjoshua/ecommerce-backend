// external imports
const express = require("express");
const bodyParser = require("body-parser");

// internal imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");

// create express app
const app = express();

// set template engine
app.set("view engine", "ejs");
app.set("views", "views");

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

// find user
app.use((req, res, next) => {
  User.findByID("5fcdf3eaff7e9bfcdbd3f9d7").then((user) => {
    req.user = user;
    next();
  });
});

// adding middleware for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// error controller
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// connect database
mongoConnect(() => {
  // start server at port 3000
  app.listen(3000);
});
