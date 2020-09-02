// imports
const express = require("express");
const bodyParser = require("body-parser");

const mainRoutes = require("./routes/main");

// create express app
const app = express();

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(mainRoutes);

// error page
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// start server at port 3000
app.listen(3000);
