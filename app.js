// imports
const express = require("express");
const bodyParser = require("body-parser");

const mainRoutes = require("./routes/main");

// create express app
const app = express();

// adding middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(mainRoutes);

// start server at port 3000
app.listen(3000);
