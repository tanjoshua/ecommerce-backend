// external imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

// internal imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

// imports for native mongodb driver
// const User = require("./models/user");
// const mongoConnect = require("./utils/database").mongoConnect;

const MONGODB_URI =
  "mongodb+srv://user:brodin@cluster0.mnbla.mongodb.net/shop?retryWrites=true&w=majority";
// create express app
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// csrf protection
const csrfProtection = csrf();

// set template engine
app.set("view engine", "ejs");
app.set("views", "views");

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "shopsecret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// enable csrf protection after session initialized
app.use(csrfProtection);

// set csrf token for every view
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.loggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

/* FIND USER - NATIVE MONGODB DRIVER
app.use((req, res, next) => {
  User.findByID("5fcdf3eaff7e9bfcdbd3f9d7").then((user) => {
    req.user = new User(user.username, user.email, user.cart, user._id);
    next();
  });
});
*/

app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        req.user = user;
        res.locals.loggedIn = true;
        next();
      })
      .catch((err) => {
        next(new Error(err)); // use next for errors in async code
      });
  } else {
    res.locals.loggedIn = false;
    next();
  }
});

// adding middleware for routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// error controller
app.use((req, res) => {
  res.status(404).render("errors/404");
});

// handle internal server errors
app.use((error, req, res, next) => {
  console.log(error);
  res.render("errors/500");
});

// connect database
mongoose.connect(MONGODB_URI).then((result) => {
  app.listen(3000);
});

/* native mongodb driver
mongoConnect(() => {
  // start server at port 3000
  app.listen(3000);
});
*/
