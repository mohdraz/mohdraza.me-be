const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const middleWares = [
  express.json({ limit: "50mb" }),
  helmet(),
  cors(),
  express.urlencoded({ limit: "50mb", extended: true }),
];
module.exports = (server) => {
  return server.use(middleWares);
};
