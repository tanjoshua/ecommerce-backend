// external imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// internal imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const User = require("./models/user");

// const mongoConnect = require("./utils/database").mongoConnect;

// create express app
const app = express();

// set template engine
app.set("view engine", "ejs");
app.set("views", "views");

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

// find user
/*
app.use((req, res, next) => {
  User.findByID("5fcdf3eaff7e9bfcdbd3f9d7").then((user) => {
    req.user = new User(user.username, user.email, user.cart, user._id);
    next();
  });
});
*/

// adding middleware for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// error controller
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// connect database
mongoose
  .connect(
    "mongodb+srv://user:brodin@cluster0.mnbla.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  });

/* native mongodb driver
mongoConnect(() => {
  // start server at port 3000
  app.listen(3000);
});
*/
