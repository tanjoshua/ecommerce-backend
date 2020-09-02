// imports
const http = require("http");
const express = require("express");

// create express request handler
const app = express();

// adding middleware
app.use((req, res, next) => {
  console.log("middleware");
  next();
});

app.use((req, res, next) => {
  res.send("<h1>Hello</h1>");
});

// create server
const server = http.createServer(app);

// start server at port 3000
server.listen(3000);
