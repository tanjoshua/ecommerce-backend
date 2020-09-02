const http = require("http");
const express = require("express");

// create express request handler
const app = express();

// create server
const server = http.createServer(app);

// start server at port 3000
server.listen(3000);
