// imports
const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-message", (req, res, next) => {
  res.send(
    "<form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>send</button></form>"
  );
});

app.post("/message", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("home");
});

// start server at port 3000
app.listen(3000);
